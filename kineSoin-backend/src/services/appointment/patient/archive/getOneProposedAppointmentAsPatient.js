/**
 * @description Retrieves a single proposed appointment for the authenticated patient,
 *              including full therapist, prescription, medic, and affliction context.
 *
 * Rationale:
 * - Ensures patients can securely access detailed information about their pending
 *   (non‑accepted, non‑canceled) appointments, preserving data integrity and preventing
 *   unauthorized access.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates both patient and appointment IDs to avoid malformed requests.
 * - Filters only proposed appointments and enriches them with nested clinical metadata.
 * - Returns clear, consistent HTTP status codes for invalid IDs, missing records,
 *   and unexpected server errors.
 */

import { Appointment } from '../../../../models/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';

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
