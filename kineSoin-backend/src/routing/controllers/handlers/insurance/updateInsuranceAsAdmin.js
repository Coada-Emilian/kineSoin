import updateInsuranceService from '../../../../services/insurance/admin/updateInsuranceAsAdmin.js';
import updatedInsuranceSchema from '../../../../validations/joi/update/updatedInsuranceSchema.js';

export default async function updateInsuranceAsAdmin(req, res) {
  try {
    const { error } = updatedInsuranceSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const updatedInsurance = await updateInsuranceService({
      adminId: req.admin_id,
      insuranceId: req.params.insurance_id,
      insuranceData: req.body,
    });

    if (!updatedInsurance) {
      return res.status(404).json({ message: 'Insurance not found.' });
    }

    return res.status(200).json({ message: 'Insurance organism updated' });
  } catch (error) {
    console.error('Error updating insurance:', error);

    return res.status(500).json({
      message: 'Error updating insurance:',
      error: error.message,
    });
  }
}
