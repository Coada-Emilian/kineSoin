import { Patient } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

// Utility to compute patient's age from their birth date
function computeAge(birthDate) {
  const birth = new Date(birthDate);
  const ageDiffMs = Date.now() - birth.getTime();
  const ageDate = new Date(ageDiffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default async function getAllPatientsAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin not found' });
  }

  try {
    checkIsValidNumber(admin_id);

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

    if (!foundPatients || foundPatients.length === 0) {
      return res.status(404).json({ message: 'No patients found' });
    }

    const sentPatients = foundPatients.map((patient) => ({
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
    }));

    return res.status(200).json(sentPatients);
  } catch (error) {
    console.error('Error getting patients:', error);
    return res
      .status(500)
      .json({ message: `Error getting patients: ${error.message}` });
  }
}
