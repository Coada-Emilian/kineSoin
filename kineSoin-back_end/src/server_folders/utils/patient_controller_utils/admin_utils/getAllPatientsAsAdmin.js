import { Patient } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function getAllPatientsAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin not found' });
  } else {
    try {
      const foundPatients = await Patient.findAll({
        attributes: [
          'id',
          'name',
          'surname',
          'status',
          'birth_date',
          'phone_number',
          'city',
          'street_name',
          'street_number',
          'postal_code',
        ],
        order: [
          ['status', 'ASC'],
          ['name', 'ASC'],
        ],

        include: [
          {
            association: 'therapist',
            attributes: ['id', 'name', 'surname'],
          },
        ],
      });

      if (foundPatients.length === 0) {
        return res.status(400).json({ message: 'No patients found' });
      }

      const sentPatients = [];

      for (const patient of foundPatients) {
        const newPatient = {
          id: patient.id,
          status: patient.status,
          name: patient.name,
          surname: patient.surname,
          fullName: `${patient.name} ${patient.surname}`,
          age: computeAge(patient.birth_date),
          address: `${patient.street_number} ${patient.street_name}, ${patient.postal_code} ${patient.city}`,
          phone_number: patient.phone_number,
          therapist: patient.therapist
            ? `${patient.therapist.name} ${patient.therapist.surname}`
            : null,
        };
        sentPatients.push(newPatient);
      }

      return res.status(200).json(sentPatients);
    } catch (error) {
      return res
        .status(500)
        .json('Error getting patients :', { message: error.message });
    }
  }
}
