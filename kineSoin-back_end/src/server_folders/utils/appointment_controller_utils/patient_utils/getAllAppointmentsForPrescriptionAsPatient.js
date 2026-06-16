/**
 * @description Retrieves all non-canceled appointments for a patient related to a specific prescription,
 *              separated into future and past appointments.
 *
 * This function performs the following steps:
 * - Validates the patient ID and prescription ID as valid numbers.
 * - Queries the database for all non-canceled appointments for the given patient and prescription,
 *   including related therapist and prescription details with nested affliction and medic data.
 * - Orders the appointments by date and time ascending.
 * - If no appointments are found, returns a message indicating no appointments found.
 * - Separates appointments into future and past based on current date and time.
 * - Returns a JSON response containing both future and past appointments.
 * - Handles errors and returns a 500 status if something goes wrong.
 *
 * @param {object} req - Express request object containing:
 *   - `patient_id` in req.patient_id (string or number, parsed as int)
 *   - `prescription_id` in req.params.prescription_id (string or number, parsed as int)
 * @param {object} res - Express response object used to send JSON responses.
 *
 * @returns {object} JSON response with status and arrays of future and past appointments or a message if none found.
 */

import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Appointment } from '../../../models/index.js';

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
