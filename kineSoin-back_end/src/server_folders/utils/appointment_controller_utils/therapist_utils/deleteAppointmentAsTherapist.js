/**
 * @function deleteAppointmentAsTherapist
 * @description
 * Deletes an appointment belonging to an authenticated therapist.
 *
 * This controller:
 * - Validates the therapist ID using `getValidId`.
 * - Validates the appointment ID from request parameters.
 * - Ensures the appointment belongs to the authenticated therapist.
 * - Deletes the appointment from the database.
 * - Returns a success message when deletion is completed.
 *
 * Behavior:
 * - Ensures only authenticated therapists can delete appointments.
 * - Restricts deletion to appointments associated with the requesting therapist.
 * - Permanently removes the appointment record from the database.
 *
 * Error handling:
 * - Returns 400 if the therapist ID is missing or invalid.
 * - Returns 400 if the appointment ID is missing or invalid.
 * - Returns 400 if the appointment cannot be found or deleted.
 * - Returns 500 if a database or unexpected server error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.therapist_id` {number} Therapist ID injected by authentication middleware.
 *   - `req.params.appointment_id` {string|number} Appointment ID to delete.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 200: Success message confirming appointment deletion.
 *   - 400: Invalid therapist ID, appointment ID, or appointment not found.
 *   - 500: Internal server error.
 *
 * @sideEffects
 * - Permanently deletes an appointment record from the database.
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Appointment } from '../../../models/associations.js';

export default async function deleteAppointmentAsTherapist(req, res) {
  const therapist_id = getValidId(req.therapist_id, 'Therapist ID');

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
    res.status(500).json({ message: 'Internal server error' });
  }
}
