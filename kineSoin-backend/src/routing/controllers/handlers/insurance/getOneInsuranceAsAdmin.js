import getOneInsuranceService from '../../../../services/insurance/admin/getOneInsuranceAsAdmin.js';

export default async function getOneInsuranceAsAdmin(req, res) {
  try {
    const foundInsurance = await getOneInsuranceService({
      adminId: req.admin_id,
      insuranceId: req.params.insurance_id,
    });

    if (!foundInsurance) {
      return res.status(404).json({ message: 'Insurance not found.' });
    }
    return res.status(200).json(foundInsurance);
  } catch (error) {
    console.error('Error fetching insurance:', error);

    return res.status(500).json({
      message: 'Error fetching insurance:',
      error: error.message,
    });
  }
}
