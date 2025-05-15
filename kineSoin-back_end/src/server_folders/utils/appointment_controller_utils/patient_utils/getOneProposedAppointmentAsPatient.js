/**
 * @description Retrieves a single proposed (not accepted, not canceled) appointment
 *              by ID for the logged-in patient, including related therapist, prescription,
 *              medic, and affliction details.
 *
 * Steps performed:
 * - Validates patient ID and appointment ID from request.
 * - Queries all proposed appointments for the patient with:
 *   - is_canceled: false,
 *   - is_accepted: false,
 *   - includes therapist info,
 *   - includes prescription info with nested medic and affliction details.
 * - Finds the appointment matching the appointment ID.
 * - Returns 400 if not found, else returns 200 with appointment data.
 *
 * @param {object} req - Express request object, containing patient_id and params.id
 * @param {object} res - Express response object to send JSON response
 *
 * @returns {object} JSON of the proposed appointment or error message
 */

import { Appointment } from '../../../models/associations.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function getOneProposedAppointmentAsPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  checkIsValidNumber(patient_id);

  const appointment_id = parseInt(req.params.id, 10);

  checkIsValidNumber(appointment_id);

  const foundProposedAppointments = await Appointment.findAll({
    where: { patient_id, is_canceled: false, is_accepted: false },
    attributes: ['id', 'date', 'time'],
    association: 'therapist',
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
            attributes: ['id', 'name', 'surname', 'licence_code'],
          },
          {
            association: 'affliction',
            attributes: [
              'id',
              'name',
              'description',
              'is_operated',
              'insurance_code',
            ],
          },
        ],
      },
    ],
  });

  const foundAppointment = foundProposedAppointments.find(
    (appointment) => appointment.id === appointment_id
  );

  if (!foundAppointment) {
    return res.status(400).json({
      message: 'Appointment not found',
    });
  } else {
    return res.status(200).json(foundAppointment);
  }
}
