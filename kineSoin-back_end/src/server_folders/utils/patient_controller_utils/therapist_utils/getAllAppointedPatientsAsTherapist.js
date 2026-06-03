import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Patient } from '../../../models/index.js';

export default async function getAllAppointedPatientsAsTherapist(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  checkIsValidNumber(therapist_id);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    try {
      const foundPatients = await Patient.findAll({
        where: { therapist_id },
        order: [
          ['status', 'ASC'],
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

      if (foundPatients.length === 0) {
        return res.status(400).json({ message: 'No patients found' });
      } else {
        const sentPatients = [];

        for (const patient of foundPatients) {
          const newPatient = {
            id: patient.id,
            status: patient.status,
            fullName: `${patient.name} ${patient.surname}`,
            picture_url: patient.picture_url,
            therapist: {
              id: patient.therapist.id,
              fullName: `${patient.therapist.name} ${patient.therapist.surname}`,
              picture_url: patient.therapist.picture_url,
            },
          };

          sentPatients.push(newPatient);
        }

        return res.status(200).json(sentPatients);
      }
    } catch (error) {
      console.error('Error retrieving patients:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
