/**
 * @description Cancels a single appointment for the authenticated patient.
 *
 * Rationale:
 * - Ensures only the connected patient can cancel their own appointments,
 *   protecting data integrity and preventing unauthorized modifications.
 * - Keeps the controller focused on validation, lookup logic, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates both patient and appointment IDs to avoid malformed requests.
 * - Only cancels appointments that are currently active and not already canceled.
 * - Automatically resets `is_accepted` when a previously accepted appointment
 *   is canceled, ensuring consistent state management.
 * - Returns clear, consistent HTTP status codes for invalid IDs, missing records,
 *   and unexpected server errors.
 */

import { Appointment } from '../../../../models/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';

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
