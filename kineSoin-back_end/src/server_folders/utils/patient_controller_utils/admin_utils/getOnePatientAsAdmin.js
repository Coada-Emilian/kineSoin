/**
 * @function getOnePatientAsAdmin
 * @description
 * Retrieves a single patient with full administrative details.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Validates the patient ID from request parameters.
 * - Fetches the patient from the database using `findByPk`.
 * - Excludes sensitive/internal fields such as passwords and metadata.
 * - Includes related data such as prescriptions, therapist, medic, affliction, and appointments.
 * - Computes derived fields such as age and full phone number.
 * - Formats the patient data into a clean response object for admin use.
 *
 * Data transformation includes:
 * - fullName: concatenation of name and surname
 * - age: calculated from birth_date using `computeAge`
 * - address: formatted string combining address fields
 * - full_phone_number: concatenation of prefix and phone number
 * - therapist: formatted therapist full name or null if not assigned
 *
 * Behavior:
 * - Returns a detailed patient profile for administrative inspection.
 * - Returns 400 if patient is not found.
 *
 * Error handling:
 * - Returns 400 if admin ID or patient ID is invalid.
 * - Returns 500 for unexpected server/database errors.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.params.patient_id` {string|number} Patient ID to retrieve.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON object containing detailed patient information.
 *
 * @sideEffects
 * - No database mutations; read-only operation.
 */

import { findOrThrow } from '../../../middlewares/findOrThrow.js';
import { getValidId } from '../../../middlewares/getValidId.js';
import { Admin, Patient } from '../../../models/index.js';
import computeAge from '../../computeAge.js';

export default async function getOnePatientAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const patient_id = getValidId(req.params.patient_id, 'Patient ID');

    const foundPatient = await Patient.findByPk(patient_id, {
      attributes: {
        exclude: [
          'password',
          'old_password',
          'new_password',
          'repeated_password',
          'created_at',
          'updated_at',
          'picture_id',
        ],
      },
      include: [
        {
          association: 'prescriptions',
          attributes: [
            'id',
            'appointment_quantity',
            'is_completed',
            'at_home_care',
            'date',
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
            {
              association: 'appointments',
              attributes: ['id', 'is_canceled', 'date', 'time'],
            },
          ],
        },
        { association: 'therapist' },
      ],
    });

    if (!foundPatient) {
      return res.status(400).json({ message: 'Patient not found' });
    }

    // const currentDate = new Date().toISOString().split('T')[0];
    // const currentTime = new Date().toISOString().split('T')[1].split('.')[0];

    // const newPrescriptions =
    //   foundPatient.prescriptions?.map((prescription) => {
    //     const pastAppointments = [];
    //     const upcomingAppointments = [];

    //     prescription.appointments?.forEach((appointment) => {
    //       if (
    //         appointment.date < currentDate ||
    //         (appointment.date === currentDate && appointment.time < currentTime)
    //       ) {
    //         pastAppointments.push(appointment);
    //       } else {
    //         upcomingAppointments.push(appointment);
    //       }
    //     });

    //     return {
    //       id: prescription.id,
    //       appointment_quantity: prescription.appointment_quantity,
    //       is_completed: prescription.is_completed,
    //       at_home_care: prescription.at_home_care,
    //       date: prescription.date,
    //       past_appointments: pastAppointments,
    //       upcoming_appointments: upcomingAppointments,
    //     };
    //   }) || []; // Default to an empty array if no prescriptions

    const sentPatient = {
      id: foundPatient.id,
      name: foundPatient.name,
      surname: foundPatient.surname,
      fullName: `${foundPatient.name} ${foundPatient.surname}`,
      age: computeAge(foundPatient.birth_date),
      gender: foundPatient.gender,
      city: foundPatient.city,
      street_name: foundPatient.street_name,
      street_number: foundPatient.street_number,
      postal_code: foundPatient.postal_code,
      address: `${foundPatient.street_number} ${foundPatient.street_name}, ${foundPatient.postal_code} ${foundPatient.city}`,
      phone_number: foundPatient.phone_number,
      prefix: foundPatient.prefix,
      full_phone_number: foundPatient.prefix + foundPatient.phone_number,
      therapist: foundPatient.therapist
        ? `${foundPatient.therapist.name} ${foundPatient.therapist.surname}`
        : null,
      status: foundPatient.status,
      picture_url: foundPatient.picture_url,
      email: foundPatient.email,
    };

    return res.status(200).json(sentPatient);
  } catch (error) {
    console.error('Error fetching patient details:', error);

    return res.status(500).json({
      message: 'Error fetching patient details:',
      error: error.message,
    });
  }
}
