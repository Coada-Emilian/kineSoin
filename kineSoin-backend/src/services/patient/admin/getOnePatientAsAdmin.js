import { Admin, Patient } from '../../../models/index.js';
import computeAge from '../../../utils/computeAge.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getOnePatientAsADmin({ adminId, patientId }) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const patient_id = getValidId(patientId, 'Patient ID');

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
      //     {
      //       association: 'prescriptions',
      //       attributes: [
      //         'id',
      //         'appointment_quantity',
      //         'is_completed',
      //         'at_home_care',
      //         'date',
      //       ],
      //       include: [
      //         {
      //           association: 'medic',
      //           attributes: ['id', 'name', 'surname'],
      //         },
      //         {
      //           association: 'affliction',
      //           attributes: ['id', 'name', 'description'],
      //         },
      //         {
      //           association: 'appointments',
      //           attributes: ['id', 'is_canceled', 'date', 'time'],
      //         },
      //       ],
      //     },
      { association: 'therapist', attributes: ['id', 'name', 'surname'] },
    ],
  });

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

  return sentPatient;
}
