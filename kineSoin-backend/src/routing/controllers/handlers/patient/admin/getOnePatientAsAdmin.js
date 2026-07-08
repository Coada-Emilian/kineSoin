import getOnePatientService from '../../../../../services/patient/admin/getOnePatientAsAdmin.js';

export default async function getOnePatientAsAdmin(req, res) {
  const patient = await getOnePatientService({
    adminId: req.user.id,
    patientId: req.params.patient_id,
  });

  if (!patient) {
    return res.status(404).json({ message: 'Patient not found.' });
  }

  return res.status(200).json(patient);
}
