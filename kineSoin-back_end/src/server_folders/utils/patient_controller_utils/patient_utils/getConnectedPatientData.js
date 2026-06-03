import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Patient } from '../../../models/index.js';
import { checkPatientStatus } from '../../checkPatientStatus.js';

export default async function getConnectedPatientData(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  checkIsValidNumber(patient_id);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient not found' });
  } else {
    try {
      const foundPatient = await Patient.findByPk(patient_id, {
        attributes: {
          exclude: [
            'password',
            'created_at',
            'updated_at',
            'picture_id',
            'birth_name',
          ],
        },
        include: [
          {
            association: 'prescriptions',
            where: { is_completed: false },
            required: false,
            attributes: [
              'id',
              'appointment_quantity',
              'at_home_care',
              'date',
              'picture_url',
            ],
            include: [
              {
                association: 'appointments',
                where: {
                  [Op.and]: [{ is_canceled: false }, { is_accepted: true }],
                },
                required: false,
                attributes: ['id', 'date', 'time'],
              },
              { association: 'medic', attributes: ['name', 'surname'] },
              {
                association: 'affliction',
                attributes: ['name', 'description'],
              },
            ],
          },
          {
            association: 'insurance',
            required: false,
            attributes: [
              'id',
              'name',
              'amc_code',
              'street_number',
              'street_name',
              'postal_code',
              'city',

              'full_phone_number',
            ],
            through: {
              attributes: [
                'adherent_code',
                'contract_number',
                'start_date',
                'end_date',
              ],
            },
          },
        ],
      });

      checkPatientStatus(foundPatient);

      const address = `${foundPatient.street_number} ${foundPatient.street_name}, ${foundPatient.postal_code} ${foundPatient.city}`;
      const fullName = `${foundPatient.name} ${foundPatient.surname}`;

      const sentPatientData = {
        fullName,
        surname: foundPatient.surname,
        name: foundPatient.name,
        birth_date: foundPatient.birth_date,
        picture_url: foundPatient.picture_url,
        picture_id: foundPatient.picture_id,
        street_number: foundPatient.street_number,
        street_name: foundPatient.street_name,
        postal_code: foundPatient.postal_code,
        city: foundPatient.city,
        prefix: foundPatient.prefix,
        phone_number: foundPatient.phone_number,
        full_phone_number: foundPatient.prefix + foundPatient.phone_number,
        address,
        age: computeAge(foundPatient.birth_date),
        gender: foundPatient.gender,
        email: foundPatient.email,
        insurance: foundPatient.insurance,
        prescriptions: foundPatient.prescriptions,
      };

      res.status(200).json(sentPatientData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
