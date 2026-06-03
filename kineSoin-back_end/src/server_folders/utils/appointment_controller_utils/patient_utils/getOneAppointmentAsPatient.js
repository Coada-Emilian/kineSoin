/**
 * @description Retrieves a single non-canceled appointment by ID for the logged-in patient,
 *              including detailed associated prescription, affliction, and medic info.
 *
 * This function performs the following:
 * - Validates patient ID and appointment ID.
 * - Queries the Appointment model to find the appointment matching:
 *   - patient_id from request,
 *   - appointment id from URL parameter,
 *   - is_canceled flag false.
 * - Includes related prescription data with:
 *   - appointment quantity, at-home care flag, date, picture URL,
 *   - nested affliction details (id, name, description, is_operated, insurance_code),
 *   - nested medic details (id, name, surname, licence_code).
 * - If the appointment is not found, returns 400 status with an error message.
 * - Otherwise, returns 200 status with the appointment data in JSON.
 *
 * @param {object} req - Express request object, containing patient_id and params.id
 * @param {object} res - Express response object to send JSON response
 *
 * @returns {object} JSON of appointment data or error message
 */

import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Appointment } from '../../../models/index.js';

export default async function getOneAppointmentAsPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  checkIsValidNumber(patient_id);

  const appointment_id = parseInt(req.params.id, 10);

  checkIsValidNumber(appointment_id);

  const foundAppointment = await Appointment.findOne({
    where: { patient_id, id: appointment_id, is_canceled: false },
    attributes: ['id', 'is_accepted', 'date', 'time', 'is_canceled'],
    include: [
      {
        association: 'prescription',
        attributes: [
          'appointment_quantity',
          'at_home_care',
          'date',
          'picture_url',
        ],
        include: [
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
          {
            association: 'medic',
            attributes: ['id', 'name', 'surname', 'licence_code'],
          },
        ],
      },
    ],
  });

  if (!foundAppointment) {
    return res.status(400).json({ message: 'Appointment not found' });
  } else {
    return res.status(200).json(foundAppointment);
  }
}
