import getPatientHistoryService from '../../../../../services/patient/therapist/getPatientHistoryAsTherapist.js';

export default async function getPatientHistoryAsTherapist(req, res) {
  const foundPatientHistory = await getPatientHistoryService({
    therapistId: req.user.id,
    patientId: req.query.patient_id,
  });

  if (!foundPatientHistory) {
    return res.status(404).json({ message: 'Patient history not found.' });
  }

  return res.status(200).json(foundPatientHistory);
}
