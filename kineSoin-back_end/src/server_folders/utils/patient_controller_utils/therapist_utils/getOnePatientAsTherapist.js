import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Patient, Patient_Insurance } from '../../../models/index.js';
import computeAge from '../../computeAge.js';

export default async function getOnePatientAsTherapist(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  checkIsValidNumber(therapist_id);

  try {
    const patient_id = parseInt(req.params.patient_id, 10);

    checkIsValidNumber(patient_id);

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

    if (!foundPatientInsurance) {
      return res.status(404).json({ message: 'Patient insurance not found' });
    } else {
      foundPatient.dataValues.insurance_details = foundPatientInsurance;
    }

    if (!foundPatient) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      const age = computeAge(foundPatient.birth_date);

      foundPatient.dataValues.age = age;

      return res.status(200).json(foundPatient);
    }
  } catch (error) {
    console.error('Error retrieving patient:', error.message);

    return res.status(500).json({ message: 'Internal server error' });
  }
}
