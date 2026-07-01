import getOnePatientService from '../../../../../services/patient/admin/getOnePatientAsAdmin.js';

export default async function getOnePatientAsAdmin(req, res) {
  try {
    const patient = await getOnePatientService({
      adminId: req.admin_id,
      patientId: req.params.patient_id,
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }

    return res.status(200).json(patient);
  } catch (error) {
    console.error('Error fetching patient details:', error);

    return res.status(500).json({
      message: 'Error fetching patient details:',
      error: error.message,
    });
  }
}
