import changePatientStatusService from '../../../../../services/patient/admin/changePatientStatusAsAdmin.js';
import updatedPatientStatusSchema from '../../../../../validations/joi/update/updatedPatientStatusSchema.js';

export default async function changePatientStatusAsAdmin(req, res) {
  try {
    const { error } = updatedPatientStatusSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    await changePatientStatusService({
      adminId: req.admin_id,
      patientId: req.params.patient_id,
      statusData: req.body,
    });

    return res.status(200).json({
      message: 'Patient status updated successfully!',
    });
  } catch (error) {
    console.error('Error toggling patient status:', error);

    return res.status(500).json({
      message: 'Error toggling patient status:',
      error: error.message,
    });
  }
}
