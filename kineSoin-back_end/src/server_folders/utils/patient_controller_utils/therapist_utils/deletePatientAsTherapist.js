import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Patient } from '../../../models/index.js';

export default async function deletePatientAsTherapist(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  const patient_id = parseInt(req.params.patient_id, 10);

  if (!therapist_id || !patient_id) {
    return res.status(400).json({ message: 'Invalid therapist or patient ID' });
  } else {
    checkIsValidNumber(therapist_id);
    checkIsValidNumber(patient_id);

    try {
      const foundPatient = await Patient.findByPk(patient_id);

      if (!foundPatient) {
        return res.status(404).json({ message: 'Patient not found' });
      } else {
        if (foundPatient.therapist_id !== therapist_id) {
          return res
            .status(403)
            .json({ message: 'Unauthorized to delete this patient' });
        } else {
          await foundPatient.destroy();

          return res
            .status(200)
            .json({ message: 'Patient deleted successfully' });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting patient' });
    }
  }
}
