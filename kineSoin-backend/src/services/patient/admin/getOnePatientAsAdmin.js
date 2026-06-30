/**
 * @description Retrieves a detailed patient profile for the authenticated admin,
 *              returning a normalized, frontend‑ready structure enriched with
 *              derived fields and related medical data.
 *
 * Rationale:
 * - Ensures only verified administrators can access full patient records,
 *   protecting system integrity and preventing unauthorized reads.
 * - Keeps the controller focused on validation, structured relational querying,
 *   and predictable response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates both admin and patient IDs before performing any read operation.
 * - Excludes sensitive fields (passwords, metadata) and enriches the payload with
 *   computed values such as `fullName`, `age`, `address`, and `full_phone_number`.
 * - Includes related entities (prescriptions, medic, affliction, therapist,
 *   appointments) to provide a complete administrative overview.
 * - Returns clear, consistent HTTP status codes for missing records and
 *   unexpected server errors.
 */

import { Admin, Patient } from '../../../models/index.js';
import computeAge from '../../../utils/computeAge.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

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
