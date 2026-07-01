/**
 * @description Retrieves all active (non‑canceled) appointments for the authenticated patient,
 *              separated into future and past entries.
 *
 * Rationale:
 * - Ensures patients can reliably view their appointment history and upcoming sessions,
 *   with clear separation and ordering that simplifies frontend rendering.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the patient ID to prevent malformed requests.
 * - Includes therapist, prescription, affliction, and medic metadata to provide a
 *   complete appointment context.
 * - Sorts future appointments chronologically and past appointments in reverse order
 *   for intuitive display.
 * - Returns consistent HTTP status codes for invalid IDs, empty results, and
 *   unexpected server errors.
 */

import { Appointment } from '../../../../models/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';

export default async function getAllAppointmentsAsPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  checkIsValidNumber(patient_id);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient not found' });
  } else {
    try {
      const foundAppointments = await Appointment.findAll({
        where: { patient_id: patient_id, is_canceled: false },
        attributes: ['id', 'is_accepted', 'date', 'time'],
        include: [
          {
            association: 'therapist',
            attributes: ['name', 'surname', 'specialty'],
          },
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

      if (!foundAppointments.length) {
        return res.status(200).json({
          pastAppointments: [],
          futureAppointments: [],
        });
      }

      const currentDate = new Date();

      const futureAppointments = foundAppointments
        .filter((appointment) => {
          const appointmentDateTime = new Date(
            `${appointment.date}T${appointment.time}`
          );
          return appointmentDateTime > currentDate;
        })
        .sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateA - dateB; // Ascending order
        });

      const pastAppointments = foundAppointments
        .filter((appointment) => {
          const appointmentDateTime = new Date(
            `${appointment.date}T${appointment.time}`
          );
          return appointmentDateTime < currentDate;
        })
        .sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateB - dateA; // Descending order
        });

      res.status(200).json({ futureAppointments, pastAppointments });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
