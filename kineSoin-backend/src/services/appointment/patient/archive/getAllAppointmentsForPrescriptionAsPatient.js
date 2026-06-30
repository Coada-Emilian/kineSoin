/**
 * @description Retrieves all active (non‑canceled) appointments for a specific prescription,
 *              separating them into future and past entries for the authenticated patient.
 *
 * Rationale:
 * - Ensures patients can review appointment history and upcoming sessions tied to a single
 *   prescription, keeping the workflow clear and medically contextualized.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates both patient and prescription IDs to prevent malformed or unauthorized requests.
 * - Includes therapist, prescription, affliction, and medic metadata to provide complete
 *   appointment context.
 * - Returns future and past appointments based on current date/time, offering a consistent
 *   structure for frontend rendering.
 * - Provides clear, consistent HTTP status codes for invalid IDs, empty results, and
 *   unexpected server errors.
 */

import { Appointment } from '../../../../models/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';

export default async function getAllAppointmentsForPrescriptionAsPatient(
  req,
  res
) {
  const patient_id = parseInt(req.patient_id, 10);

  checkIsValidNumber(patient_id);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient not found' });
  } else {
    try {
      const prescription_id = parseInt(req.params.prescription_id, 10);

      checkIsValidNumber(prescription_id);

      const currentDate = new Date();

      const foundAppointments = await Appointment.findAll({
        where: {
          patient_id,
          prescription_id,
          is_canceled: false,
        },
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
        order: [
          ['date', 'ASC'],
          ['time', 'ASC'],
        ],
      });

      if (!foundAppointments.length) {
        return res.status(200).json({ message: 'No appointments found' });
      } else {
        const futureAppointments = foundAppointments.filter((appointment) => {
          const appointmentDateTime = new Date(
            `${appointment.date}T${appointment.time}`
          );
          return appointmentDateTime > currentDate;
        });

        const pastAppointments = foundAppointments.filter((appointment) => {
          const appointmentDateTime = new Date(
            `${appointment.date}T${appointment.time}`
          );
          return appointmentDateTime < currentDate;
        });

        res.status(200).json({ futureAppointments, pastAppointments });
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
