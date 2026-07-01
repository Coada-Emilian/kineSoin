import createInsuranceService from '../../../../services/insurance/admin/createInsuranceAsAdmin.js';
import createdInsuranceSchema from '../../../../validations/joi/creation/createdInsuranceSchema.js';

export default async function createInsuranceAsAdmin(req, res) {
  try {
    const { error } = createdInsuranceSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const createdInsurance = await createInsuranceService({
      adminId: req.admin_id,
      insuranceData: req.body,
    });

    if (!createdInsurance) {
      return res
        .status(500)
        .json({ message: 'Error while creating insurance.' });
    }

    return res
      .status(201)
      .json({ message: 'Insurance organism created successfully' });
  } catch (error) {
    console.error('Error creating insurance:', error);

    return res.status(500).json({
      message: 'Error creating insurance:',
      error: error.message,
    });
  }
}
