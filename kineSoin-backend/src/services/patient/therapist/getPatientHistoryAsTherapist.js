import { Patient, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getPatientHistoryAsTherapist({
  therapistId,
  patientId,
}) {
  const therapist_id = getValidId(therapistId, 'Therapist ID');
  await findOrThrow(Therapist, therapist_id, 'Therapist');

  console.log('Patient ID:', patientId); // Log the patientId value

  const patient_id = getValidId(patientId, 'Patient ID');

  const foundPatient = await Patient.findByPk(patient_id, {
    attributes: ['name', 'surname', 'picture_url'],
    include: [
      {
        association: 'prescriptions',
        attributes: [
          'id',
          'appointment_quantity',
          'completed_appointment_quantity',
          'at_home_care',
          'date',
          'picture_url',
          'updated_at',
        ],
        include: [
          {
            association: 'medic',
            attributes: ['name', 'surname', 'email'],
          },
          {
            association: 'affliction',
            attributes: ['name', 'description'],
          },
          {
            association: 'appointments',
            attributes: ['id', 'date', 'time', 'is_canceled', 'is_accepted'],
            include: [
              {
                association: 'therapist',
                attributes: ['id', 'name', 'surname', 'picture_url'],
              },
            ],
          },
        ],
      },
    ],
  });

  return foundPatient;
}
