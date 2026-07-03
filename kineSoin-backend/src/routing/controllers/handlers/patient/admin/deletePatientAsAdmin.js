import deletePatientService from '../../../../../services/patient/admin/deletePatientAsAdmin.js';

export default async function deletePatientAsAdmin(req, res) {
  await deletePatientService({
    adminId: req.admin_id,
    patientId: req.params.patient_id,
  });

  return res.status(200).json({ message: 'Patient deleted successfully!' });
}
