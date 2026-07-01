import deletePatientService from '../../../../../services/patient/admin/deletePatientAsAdmin.js';

export default async function deletePatientAsAdmin(req, res) {
  try {
    await deletePatientService({
      adminId: req.admin_id,
      patientId: req.params.patient_id,
    });

    return res.status(200).json({ message: 'Patient deleted successfully!' });
  } catch (error) {
    console.error('Error deleting patient:', error);

    return res.status(500).json({
      message: 'Error deleting patient:',
      error: error.message,
    });
  }
}
