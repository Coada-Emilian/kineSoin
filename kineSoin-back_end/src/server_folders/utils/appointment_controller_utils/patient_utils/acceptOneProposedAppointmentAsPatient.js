/**
 * @description Accepts one proposed appointment for a patient.
 *
 * This function performs the following:
 * - Validates `patient_id` and `appointment_id` as numbers.
 * - Fetches all proposed appointments for the given patient that are not canceled and not yet accepted.
 * - Searches among those appointments for the one matching the specified appointment ID.
 * - If found, marks the appointment as accepted and saves the change.
 * - Returns a success message with the accepted appointment details.
 * - Returns an error if the appointment is not found.
 *
 * Associated models included in the response:
 * - Prescription details, including appointment quantity, at-home care status, date, and picture URL.
 * - Medic details (id, name, surname).
 * - Affliction details (id, name, description).
 *
 * @param {object} req - Express request object containing:
 *   - `patient_id` in req.patient_id (string or number, parsed as int)
 *   - `id` in req.params (appointment id to accept)
 * @param {object} res - Express response object to send JSON responses.
 *
 * @returns {object} JSON response with status and message.
 */

import { Appointment } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function acceptOneProposedAppointmentAsPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  checkIsValidNumber(patient_id);

  const appointment_id = parseInt(req.params.id, 10);

  checkIsValidNumber(appointment_id);

  const foundProposedAppointments = await Appointment.findAll({
    where: { patient_id, is_canceled: false, is_accepted: false },
    attributes: ['id', 'date', 'time'],
    include: [
      {
        association: 'prescription',
        attributes: [
          'id',
          'appointment_quantity',
          'at_home_care',
          'date',
          'picture_url',
        ],
        include: [
          {
            association: 'medic',
            attributes: ['id', 'name', 'surname'],
          },
          {
            association: 'affliction',
            attributes: ['id', 'name', 'description'],
          },
        ],
      },
    ],
  });

  const foundAppointment = foundProposedAppointments.find(
    (appointment) => appointment.id === appointment_id
  );

  if (!foundAppointment) {
    return res.status(400).json({ message: 'Appointment not found' });
  } else {
    foundAppointment.is_accepted = true;

    await foundAppointment.save();

    return res.status(200).json({
      message: 'Appointment successfully accepted',
      foundAppointment,
    });
  }
}
