import { Patient } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';
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
        ],
      },
      include: [
        {
          association: 'insurance',
          attributes: ['id', 'name'],
        },
        // { association: 'patient_insurance' },
        // {
        //   association: 'prescriptions',
        //   attributes: [
        //     'id',
        //     'appointment_quantity',
        //     'is_new_prescription',
        //     'is_completed',
        //     'at_home_care',
        //     'date',
        //     'picture_url',
        //   ],
        //   include: [
        //     {
        //       association: 'medic',
        //       attributes: [
        //         'id',
        //         'name',
        //         'surname',
        //         'street_number',
        //         'street_name',
        //         'postal_code',
        //         'city',
        //         'prefix',
        //         'phone_number',
        //         'licence_code',
        //       ],
        //     },
        //     {
        //       association: 'affliction',
        //       attributes: ['id', 'name', 'description'],
        //     },
        //     {
        //       association: 'appointments',
        //       attributes: ['id', 'is_canceled', 'date', 'time'],
        //     },
        //   ],
        // },
        {
          association: 'therapist',
        },
      ],
    });

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
