/**
 * @description Retrieves all active (accepted, non‑canceled) appointments
 *              for the authenticated therapist, including basic patient context.
 *
 * Rationale:
 * - Ensures therapists can securely access only their own active appointments,
 *   preserving data integrity and preventing unauthorized data exposure.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the therapist ID before performing any read operation.
 * - Returns only accepted and non‑canceled appointments, sorted chronologically
 *   for intuitive consumption by the frontend.
 * - Includes essential patient metadata to support appointment management.
 * - Provides clear, consistent HTTP status codes for invalid IDs, empty results,
 *   and unexpected server errors.
 */

import { Appointment, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAllAppointmentsAsTherapist(req, res) {
  const therapist_id = getValidId(req.therapist_id, 10);

  await findOrThrow(Therapist, therapist_id, 'Therapist');

  try {
    const foundAppointments = await Appointment.findAll({
      where: {
        therapist_id,
        is_canceled: false,
        is_accepted: true,
      },
      attributes: ['id', 'date', 'time'],
      include: [
        {
          association: 'patient',
          attributes: ['id', 'name', 'surname', 'picture_url'],
        },
      ],
      order: [
        ['date', 'ASC'],
        ['time', 'ASC'],
      ],
    });

    if (!foundAppointments || foundAppointments.length === 0) {
      return res.status(200).json({ message: 'No appointments found' });
    }

    res.status(200).json(foundAppointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);

    return res.status(500).json({
      message: 'Error fetching appointments:',
      error: error.message,
    });
  }
}
