/**
 * @description Allows a therapist to delete an appointment by its ID.
 *
 * Validations and steps:
 * - Validates the therapist ID from the request.
 * - Validates the appointment ID from the request parameters.
 * - Attempts to delete the appointment matching the appointment ID and therapist ID.
 * - If no appointment is found/deleted, returns a 400 error with an appropriate message.
 * - If deletion is successful, returns a success message.
 * - Handles unexpected errors with a 500 status and logs the error.
 *
 * @param {object} req - Express request object containing therapist_id and params.appointment_id
 * @param {object} res - Express response object for sending JSON responses
 *
 * @returns {object} JSON success or error message indicating the result of the deletion attempt
 */

import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Appointment } from '../../../models/associations.js';

export default async function deleteAppointmentAsTherapist(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  checkIsValidNumber(therapist_id);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    try {
      const appointment_id = parseInt(req.params.appointment_id, 10);

      checkIsValidNumber(appointment_id);

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
}
