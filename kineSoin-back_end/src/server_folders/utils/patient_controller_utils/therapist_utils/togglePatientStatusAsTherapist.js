import { Patient } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function togglePatientStatusAsTherapist(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  checkIsValidNumber(therapist_id);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    try {
      const patient_id = parseInt(req.params.patient_id, 10);

      checkIsValidNumber(patient_id);

      const foundPatient = await Patient.findByPk(patient_id);

      if (!foundPatient) {
        return res.status(400).json({ message: 'Patient not found' });
      } else {
        if (
          foundPatient.status === 'pending' ||
          foundPatient.status === 'banned'
        ) {
          return res.status(400).json({
            message: 'Cannot change status of pending or banned patient',
          });
        } else {
          if (foundPatient.status === 'active') {
            foundPatient.status = 'inactive';

            await foundPatient.save();

            return res.status(200).json({
              message: 'Patient status updated successfully!',
            });
          } else if (foundPatient.status === 'inactive') {
            foundPatient.status = 'active';

            await foundPatient.save();

            return res.status(200).json({
              message: 'Patient status updated successfully!',
            });
          }
        }
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
