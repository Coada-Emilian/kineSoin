import {
  Patient,
  Patient_Insurance,
  Therapist,
} from '../../../models/index.js';
import computeAge from '../../../utils/computeAge.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getOnePatientAsTherapist({
  therapistId,
  patientId,
}) {
  const therapist_id = getValidId(therapistId, 'Therapist ID');
  await findOrThrow(Therapist, therapist_id, 'Therapist');

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
        'birth_name',
        'full_phone_number',
        'gender',
      ],
    },
    include: [
      {
        association: 'therapist',
        attributes: ['id', 'name', 'surname'],
      },
    ],
  });

  const foundPatientInsurance = await Patient_Insurance.findOne({
    where: { patient_id },
    attributes: [
      'id',
      'adherent_code',
      'contract_number',
      'start_date',
      'end_date',
    ],
    include: [
      {
        association: 'insurance',
        attributes: ['id', 'name'],
      },
    ],
  });

  if (foundPatientInsurance) {
    foundPatient.dataValues.insurance_details = foundPatientInsurance;
  }
  const age = computeAge(foundPatient.birth_date);

  foundPatient.dataValues.age = age;

  return foundPatient;
}
