/**
 * @description Cancels a specific appointment for a patient.
 *
 * This function performs the following steps:
 * - Validates the patient ID and appointment ID as valid numbers.
 * - Searches for an appointment by the given patient ID and appointment ID that is not already canceled.
 * - If the appointment is found, marks it as canceled.
 * - If the appointment was previously accepted, marks it as not accepted.
 * - Saves the updated appointment.
 * - Returns a success message with the canceled appointment details.
 * - Returns an error if the appointment is not found or cancellation fails.
 *
 * @param {object} req - Express request object containing:
 *   - `patient_id` in req.patient_id (string or number, parsed as int)
 *   - `id` in req.params (appointment id to cancel)
 * @param {object} res - Express response object used to send JSON responses.
 *
 * @returns {object} JSON response with status and message indicating success or failure.
 */

import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Appointment } from '../../../models/index.js';

export default async function cancelOneAppointmentAsPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  checkIsValidNumber(patient_id);

  const appointmentId = parseInt(req.params.id, 10);

  checkIsValidNumber(appointmentId);

  const foundAppointment = await Appointment.findOne({
    where: { patient_id, id: appointmentId, is_canceled: false },
  });

  if (!foundAppointment) {
    return res
      .status(400)
      .json({ message: 'Appointment not found or already canceled' });
  } else {
    foundAppointment.is_canceled = true;

    if (foundAppointment.is_accepted) {
      foundAppointment.is_accepted = false;
    }

    const response = await foundAppointment.save();

    if (!response) {
      return res.status(400).json({ message: 'Appointment was not canceled' });
    } else {
      return res.status(200).json({
        message: 'Appointment successfully canceled',
        foundAppointment,
      });
    }
  }
}
