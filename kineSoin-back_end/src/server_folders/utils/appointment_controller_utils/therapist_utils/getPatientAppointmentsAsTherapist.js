/**
 * @function getPatientAppointmentsAsTherapist
 * @description
 * Retrieves all appointments associated with a specific patient and categorizes
 * them into previous and upcoming appointments for therapist review.
 *
 * This controller:
 * - Validates the therapist ID using `getValidId`.
 * - Validates the patient ID from request parameters.
 * - Retrieves the patient from the database.
 * - Fetches all appointments associated with the patient.
 * - Includes therapist, prescription, medic, and affliction information.
 * - Sorts appointments chronologically by date and time.
 * - Separates appointments into previous and upcoming groups using
 *   `getAppointmentDateTime`.
 * - Returns categorized appointments along with patient information.
 *
 * Behavior:
 * - Ensures only authenticated therapists can access patient appointment data.
 * - Provides a complete appointment history for a specific patient.
 * - Enriches appointment data with related medical and prescription information.
 * - Categorizes appointments based on the current date and time.
 *
 * Appointment categorization:
 * - `previousAppointments`: Appointments that occurred before the current date/time.
 * - `upcomingAppointments`: Appointments scheduled for the future or current date/time.
 *
 * Error handling:
 * - Returns 400 if the therapist ID is missing or invalid.
 * - Returns 400 if the patient ID is missing or invalid.
 * - Returns 404 if the patient is not found.
 * - Returns 404 if no appointments are found for the patient.
 * - Returns 500 if a database or unexpected server error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.therapist_id` {number} Therapist ID injected by authentication middleware.
 *   - `req.params.patient_id` {string|number} Patient ID whose appointments are retrieved.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 200: Categorized appointment history and patient information.
 *   - 400: Invalid therapist ID or patient ID.
 *   - 404: Patient not found or no appointments found.
 *   - 500: Internal server error.
 *
 * Response payload:
 * - `previousAppointments` {Array<Object>} Past appointments.
 * - `upcomingAppointments` {Array<Object>} Future appointments.
 * - `patient` {Object} Patient summary information.
 *   - `id` {number} Patient ID.
 *   - `fullName` {string} Patient full name.
 *   - `picture_url` {string|null} Patient profile picture URL.
 *   - `status` {string} Patient status.
 *
 * Included appointment relations:
 * - `therapist` {Object} Assigned therapist information.
 * - `prescription` {Object} Associated prescription.
 * - `prescription.medic` {Object} Prescribing medic information.
 * - `prescription.affliction` {Object} Related affliction information.
 *
 * @sideEffects
 * - None (read-only database operations).
 */

import getAppointmentDateTime from '../../../middlewares/getAppointmentDateTime.js';
import { getValidId } from '../../../middlewares/getValidId.js';
import { Appointment, Patient } from '../../../models/index.js';

export default async function getPatientAppointmentsAsTherapist(req, res) {
  const therapist_id = getValidId(req.therapist_id, 'Therapist ID');

  if (!therapist_id) {
    return res.status(400).json({ error: 'Invalid therapist ID' });
  } else {
    const patient_id = getValidId(req.params.patient_id, 10);

    if (!patient_id) {
      return res.status(400).json({ error: 'Patient ID' });
    } else {
      try {
        const foundPatient = await Patient.findOne({
          where: { id: patient_id },
          attributes: ['id', 'name', 'surname', 'picture_url'],
        });

        if (!foundPatient) {
          return res.status(404).json({ error: 'Patient not found' });
        }

        const foundAppointments = await Appointment.findAll({
          where: { patient_id },
          attributes: {
            exclude: ['created_at', 'updated_at', 'therapist_id'],
          },
          order: [
            ['date', 'ASC'],
            ['time', 'ASC'],
          ],
          include: [
            {
              association: 'therapist',
              attributes: ['id', 'name', 'surname'],
            },
            {
              association: 'prescription',
              attributes: {
                exclude: [
                  'created_at',
                  'updated_at',
                  'affliction_id',
                  'medic_id',
                  'picture_id',
                  'prescription_id',
                ],
              },
              include: [
                {
                  association: 'medic',
                  attributes: [
                    'id',
                    'name',
                    'surname',
                    'email',
                    'prefix',
                    'phone_number',
                  ],
                },
                {
                  association: 'affliction',
                  attributes: ['id', 'name', 'description'],
                },
              ],
            },
          ],
        });

        if (!foundAppointments || foundAppointments.length === 0) {
          return res
            .status(404)
            .json({ error: 'No appointments found for this patient' });
        } else {
          const currentDate = new Date();
          const currentTime = currentDate.toTimeString().split(' ')[0];

          const previousAppointments = foundAppointments.filter(
            (appointment) => {
              const appointmentDateTime = getAppointmentDateTime(
                appointment.date,
                appointment.time
              );
              return appointmentDateTime < new Date();
            }
          );

          const upcomingAppointments = foundAppointments.filter(
            (appointment) => {
              const appointmentDateTime = getAppointmentDateTime(
                appointment.date,
                appointment.time
              );
              return appointmentDateTime >= new Date();
            }
          );

          return res.status(200).json({
            previousAppointments,
            upcomingAppointments,
            patient: {
              id: foundPatient.id,
              fullName: `${foundPatient.name} ${foundPatient.surname}`,
              picture_url: foundPatient.picture_url,
              status: foundPatient.status,
            },
          });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
