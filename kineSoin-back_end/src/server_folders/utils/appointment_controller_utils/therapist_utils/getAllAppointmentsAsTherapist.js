/**
 * @description Retrieves all accepted and non-canceled appointments for a therapist on a specific date.
 *
 * Validations and steps:
 * - Validates the therapist ID from the request.
 * - Validates the request body to ensure day, month, and year are provided as numbers.
 * - Constructs a date string from the validated day, month, and year.
 * - Queries appointments for the therapist on the specified date that are accepted and not canceled.
 * - Includes related prescription details, only for prescriptions not completed, along with associated medic and affliction information.
 * - Orders appointments by date and time in ascending order.
 * - Returns a message if no appointments are found.
 * - Returns the list of found appointments if any exist.
 *
 * @param {object} req - Express request object containing therapist_id and body with day, month, year
 * @param {object} res - Express response object for sending JSON responses
 *
 * @returns {object} JSON with either a message indicating no appointments or a list of found appointments
 */

import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Appointment } from '../../../models/index.js';

export default async function getAllAppointmentAsTherapist(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  checkIsValidNumber(therapist_id);

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
      {
        association: 'prescription',
        where: { is_completed: false },
        attributes: [
          'id',
          'appointment_quantity',
          'at_home_care',
          'picture_url',
        ],
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

  if (!foundAppointments.length) {
    return res.status(200).json({ message: 'No appointments found' });
  }

  res.status(200).json(foundAppointments);
}
