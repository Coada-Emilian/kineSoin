import changePatientStatusService from '../../../../../services/patient/admin/changePatientStatusAsAdmin.js';
import updatedPatientStatusSchema from '../../../../../validations/joi/update/updatedPatientStatusSchema.js';

export default async function changePatientStatusAsAdmin(req, res) {
  const { error } = updatedPatientStatusSchema.validate(req.body);

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }
  await changePatientStatusService({
    adminId: req.admin_id,
    patientId: req.params.patient_id,
    statusData: req.body,
  });

  return res.status(200).json({
    message: 'Patient status updated successfully!',
  });
}
