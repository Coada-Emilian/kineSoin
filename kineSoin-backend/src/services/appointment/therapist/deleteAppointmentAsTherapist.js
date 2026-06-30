/**
 * @description Deletes an appointment belonging to the authenticated therapist.
 *
 * Rationale:
 * - Ensures therapists can only delete appointments they personally own,
 *   preserving data integrity and preventing unauthorized modifications.
 * - Keeps the controller focused on validation, ownership checks, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates therapist and appointment IDs to avoid malformed requests.
 * - Uses an ownership‑restricted deletion query to ensure the appointment
 *   belongs to the requesting therapist.
 * - Returns clear, consistent HTTP status codes for invalid IDs, missing records,
 *   and unexpected server errors.
 */

import { Appointment, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function deleteAppointmentAsTherapist(req, res) {
  const therapist_id = getValidId(req.therapist_id, 'Therapist ID');

  await findOrThrow(Therapist, therapist_id, 'Therapist');

  try {
    const appointment_id = getValidId(
      req.params.appointment_id,
      'Appointment ID'
    );

    if (!appointment_id) {
      return res.status(400).json({ message: 'Appointment not found' });
    }

    const deletedAppointment = await Appointment.destroy({
      where: { id: appointment_id, therapist_id },
    });

    if (!deletedAppointment) {
      return res.status(400).json({ message: 'Appointment not found' });
    } else {
      return res
        .status(200)
        .json({ message: 'Appointment successfully deleted' });
    }
  } catch (error) {
    console.error('Error deleting appointment:', error);

    return res.status(500).json({
      message: 'Error deleting appointment:',
      error: error.message,
    });
  }
}
