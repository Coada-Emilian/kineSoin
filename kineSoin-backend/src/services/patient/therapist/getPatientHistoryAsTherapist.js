import { Patient, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getPatientHistoryAsTherapist({
  therapistId,
  patientId,
}) {
  const therapist_id = getValidId(therapistId, 'Therapist ID');
  await findOrThrow(Therapist, therapist_id, 'Therapist');

  const patient_id = getValidId(patientId, 'Patient ID');

  const foundPatient = await Patient.findByPk(patient_id, {
    attributes: ['id', 'name', 'surname', 'picture_url'],
    include: [
      {
        association: 'prescriptions',
        attributes: [
          'id',
          'appointment_quantity',
          'completed_appointment_quantity',
          'at_home_care',
          'is_completed',
          'date',
          'picture_url',
        ],
        include: [
          {
            association: 'medic',
            attributes: ['id', 'name', 'surname', 'email'],
          },
          {
            association: 'affliction',
            attributes: ['id', 'name', 'description'],
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
