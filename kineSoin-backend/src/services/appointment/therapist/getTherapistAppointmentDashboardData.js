/**
 * @description Retrieves all same‑day active (accepted, non‑canceled) appointments
 *              for the authenticated therapist, enriched with patient and prescription context.
 *
 * Rationale:
 * - Gives therapists a clear, real‑time snapshot of their daily workload,
 *   supporting efficient session planning and patient management.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates therapist identity before performing any read operation.
 * - Filters appointments strictly to today’s date, accepted status, and non‑canceled entries.
 * - Includes essential patient and prescription metadata to provide clinical context
 *   directly within the dashboard.
 * - Returns clear, consistent HTTP status codes for empty results and unexpected errors.
 */

import { Appointment, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getTherapistAppointmentDashboardData(req, res) {
  const therapist_id = getValidId(req.therapist_id, 'Therapist ID');

  await findOrThrow(Therapist, therapist_id, 'Therapist');

  try {
    const currentDate = new Date().toISOString().split('T')[0];

    const sameDayAppointments = await Appointment.findAll({
      attributes: ['id', 'date', 'time'],
      where: {
        therapist_id,
        is_accepted: true,
        is_canceled: false,
        date: currentDate,
      },
      order: [['time', 'ASC']],
      include: [
        {
          association: 'patient',
          attributes: ['id', 'name', 'surname', 'picture_url'],
        },
        {
          association: 'prescription',
          attributes: ['id', 'appointment_quantity'],
          include: [
            {
              association: 'affliction',
              attributes: ['id', 'name', 'description', 'insurance_code'],
            },
          ],
        },
      ],
    });

    if (sameDayAppointments.length > 0) {
      return res.status(200).json({ sameDayAppointments });
    } else {
      return res.status(200).json({ message: 'No appointments today' });
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);

    return res.status(500).json({
      message: 'Error fetching dashboard data:',
      error: error.message,
    });
  }
}
