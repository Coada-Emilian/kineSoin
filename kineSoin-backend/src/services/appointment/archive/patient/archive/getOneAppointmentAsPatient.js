/**
 * @description Retrieves a single active (non‑canceled) appointment for the authenticated patient,
 *              including full prescription, affliction, and medic context.
 *
 * Rationale:
 * - Ensures patients can securely access detailed information about their own appointments,
 *   preserving data integrity and preventing unauthorized access.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates both patient and appointment IDs to avoid malformed requests.
 * - Includes nested prescription, affliction, and medic metadata to provide complete
 *   clinical context for the appointment.
 * - Returns clear, consistent HTTP status codes for invalid IDs, missing records,
 *   and unexpected server errors.
 */

import { Appointment } from '../../../../models/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';

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
