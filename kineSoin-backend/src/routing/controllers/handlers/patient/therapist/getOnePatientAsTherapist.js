import getOnePatientService from '../../../../../services/patient/therapist/getOnePatientAsTherapist.js';

export default async function getOnePatientAsTherapist(req, res) {
  const patient = await getOnePatientService({
    therapistId: req.therapist_id,
    patientId: req.params.patient_id,
  });

  if (!patient) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }

  return res.status(200).json(patient);
}
