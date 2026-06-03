import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Patient } from '../../../models/index.js';

export default async function deletePatientAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin not found' });
  } else {
    try {
      const patient_id = parseInt(req.params.patient_id, 10);

      checkIsValidNumber(patient_id);

      const response = await Patient.destroy({ where: { id: patient_id } });

      if (!response) {
        return res.status(400).json({ message: 'Patient not found' });
      } else {
        return res
          .status(200)
          .json({ message: 'Patient deleted successfully!' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
