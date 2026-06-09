/**
 * @function getAllAppointmentAsTherapist
 * @description
 * Retrieves all active appointments assigned to an authenticated therapist.
 *
 * This controller:
 * - Validates the therapist ID using `getValidId`.
 * - Retrieves all appointments associated with the therapist.
 * - Filters appointments to include only:
 *   - Accepted appointments (`is_accepted = true`).
 *   - Non-canceled appointments (`is_canceled = false`).
 * - Includes basic patient information for each appointment.
 * - Sorts appointments chronologically by date and time.
 *
 * Behavior:
 * - Ensures only authenticated therapists can access appointment data.
 * - Returns upcoming and active appointments only.
 * - Includes related patient information to facilitate appointment management.
 * - Returns a friendly message when no appointments are found.
 *
 * Error handling:
 * - Returns 400 if the therapist ID is missing or invalid.
 * - Returns 200 if no appointments are found.
 * - Returns 500 if a database or unexpected server error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.therapist_id` {number} Therapist ID injected by authentication middleware.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 200: Array of therapist appointments.
 *   - 200: Message indicating no appointments were found.
 *   - 400: Invalid or missing therapist ID.
 *   - 500: Internal server error.
 *
 * Response payload:
 * - `id` {number} Appointment ID.
 * - `date` {string} Appointment date.
 * - `time` {string} Appointment time.
 * - `patient` {Object} Associated patient information.
 *   - `id` {number} Patient ID.
 *   - `name` {string} Patient first name.
 *   - `surname` {string} Patient last name.
 *   - `picture_url` {string|null} Patient profile picture URL.
 *
 * @sideEffects
 * - None (read-only database operation).
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Appointment } from '../../../models/associations.js';

export default async function getAllAppointmentsAsTherapist(req, res) {
  const therapist_id = getValidId(req.therapist_id, 10);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    try {
      const foundAppointments = await Appointment.findAll({
        where: {
          therapist_id,
          is_canceled: false,
          is_accepted: true,
        },
        attributes: ['id', 'date', 'time'],
        include: [
          {
            association: 'patient',
            attributes: ['id', 'name', 'surname', 'picture_url'],
          },
          // {
          //   association: 'prescription',
          //   where: { is_completed: false },
          //   attributes: [
          //     'id',
          //     'appointment_quantity',
          //     'at_home_care',
          //     'picture_url',
          //   ],
          //   include: [
          //     {
          //       association: 'medic',
          //       attributes: [
          //         'id',
          //         'name',
          //         'surname',
          //         'email',
          //         'prefix',
          //         'phone_number',
          //       ],
          //     },
          //     {
          //       association: 'affliction',
          //       attributes: ['id', 'name', 'description'],
          //     },
          //   ],
          // },
        ],
        // include: [
        //   {
        //     association: 'prescription',
        //     where: { is_completed: false },
        //     attributes: [
        //       'id',
        //       'appointment_quantity',
        //       'at_home_care',
        //       'picture_url',
        //     ],
        //     include: [
        //       { association: 'medic', attributes: ['name', 'surname'] },
        //       { association: 'affliction', attributes: ['name', 'description'] },
        //     ],
        //   },
        // ],
        order: [
          ['date', 'ASC'],
          ['time', 'ASC'],
        ],
      });

      if (!foundAppointments || foundAppointments.length === 0) {
        return res.status(200).json({ message: 'No appointments found' });
      }

      res.status(200).json(foundAppointments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
