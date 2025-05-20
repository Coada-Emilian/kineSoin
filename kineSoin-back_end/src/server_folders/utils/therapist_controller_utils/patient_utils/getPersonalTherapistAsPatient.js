import { Patient } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function getPersonalTherapistAsPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  checkIsValidNumber(patient_id);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient not found' });
  } else {
    try {
      const foundPatient = await Patient.findByPk(patient_id, {
        attributes: ['id', 'name', 'surname', 'status'],
        include: [
          {
            association: 'therapist',
            attributes: [
              'id',
              'name',
              'surname',
              'description',
              'diploma',
              'experience',
              'specialty',
              'picture_url',
            ],
          },
        ],
      });

      if (!foundPatient) {
        return res.status(400).json({ message: 'Patient not found' });
      } else {
        checkPatientStatus(foundPatient);

        if (!foundPatient.therapist) {
          return res.status(200).json({
            message: "This patient doesn't have a therapist",
            therapist: null,
          });
        } else {
          const therapist = foundPatient.therapist;

          res.status(200).json({
            therapist,
          });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
