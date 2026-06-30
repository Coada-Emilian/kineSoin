/**
 * @description Accepts a single proposed appointment for the authenticated patient.
 *
 * Rationale:
 * - Ensures only the connected patient can accept their own pending appointments,
 *   preserving data integrity and preventing unauthorized modifications.
 * - Keeps the controller focused on validation, lookup logic, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates both patient and appointment IDs to avoid malformed requests.
 * - Filters proposed appointments to ensure the patient can only accept
 *   non‑canceled, non‑accepted entries.
 * - Returns clear, consistent HTTP status codes for invalid IDs, missing records,
 *   and unexpected server errors.
 */

import { Appointment } from '../../../../models/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';

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
