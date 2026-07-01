import getAllPatientsService from '../../../../../services/patient/admin/getAllPatientsAsAdmin.js';

export default async function getAllPatientsAsAdmin(req, res) {
  try {
    const patients = await getAllPatientsService({
      adminId: req.admin_id,
    });

    if (patients.length === 0) {
      return res.status(404).json({ message: 'No patients found.' });
    }

    return res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);

    return res
      .status(500)
      .json({ message: `Error fetching patients: ${error.message}` });
  }
}
