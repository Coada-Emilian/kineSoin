import getAllPatientsService from '../../../../../services/patient/therapist/getAllPatientsAsTherapist.js';

export default async function getAllPatientsAsTherapist(req, res) {
  const patients = await getAllPatientsService({
    therapistId: req.user.id,
  });

  if (patients.length === 0) {
    return res.status(404).json({ message: 'No patients found.' });
  }

  return res.status(200).json(patients);
}
