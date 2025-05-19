/**
 * @description Retrieves all non-canceled appointments for a patient,
 *              separated into future and past appointments.
 *
 * This function performs the following steps:
 * - Validates the patient ID as a valid number.
 * - Queries the database for all non-canceled appointments of the patient,
 *   including related therapist and prescription data.
 * - If no appointments are found, returns empty arrays for past and future appointments.
 * - Separates appointments into future and past based on current date and time.
 * - Sorts future appointments in ascending order by date/time.
 * - Sorts past appointments in descending order by date/time.
 * - Returns a JSON response containing both future and past appointments.
 * - Handles errors and returns a 500 status if something goes wrong.
 *
 * @param {object} req - Express request object containing:
 *   - `patient_id` in req.patient_id (string or number, parsed as int)
 * @param {object} res - Express response object used to send JSON responses.
 *
 * @returns {object} JSON response with status and arrays of future and past appointments.
 */

import { Appointment } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

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
