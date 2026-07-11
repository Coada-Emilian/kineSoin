import { Patient, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAllPatientsAsTherapist({ therapistId }) {
  const therapist_id = getValidId(therapistId, 'Therapist ID');

  await findOrThrow(Therapist, therapist_id, 'Therapist');

  const foundPatients = await Patient.findAll({
    order: [
      ['status', 'ASC'],
      ['therapist_id', 'ASC'],
      ['name', 'ASC'],
    ],
    attributes: ['id', 'name', 'surname', 'status', 'picture_url'],
    include: [
      {
        association: 'therapist',
        attributes: ['id', 'name', 'surname', 'picture_url'],
      },
    ],
  });

  const sentPatients = foundPatients.map((patient) => ({
    id: patient.id,
    status: patient.status,
    fullName: `${patient.name} ${patient.surname}`,
    picture_url: patient.picture_url,
    therapist: patient.therapist
      ? {
          id: patient.therapist.id,
          fullName: `${patient.therapist.name || ''} ${patient.therapist.surname || ''}`,
          picture_url: patient.therapist.picture_url || null,
        }
      : null,
  }));

  return sentPatients;
}
