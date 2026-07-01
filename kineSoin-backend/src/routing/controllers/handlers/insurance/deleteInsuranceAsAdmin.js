import deleteInsuranceService from '../../../../services/insurance/admin/deleteInsuranceAsAdmin.js';

export default async function deleteInsuranceAsAdmin(req, res) {
  try {
    await deleteInsuranceService({
      adminId: req.admin_id,
      insuranceId: req.params.insurance_id,
    });
    return res.status(200).json({ message: 'Insurance deleted successfully.' });
  } catch (error) {
    console.error('Error deleting insurance:', error);

    return res.status(500).json({
      message: 'Error deleting insurance.',
      error: error.message,
    });
  }
}
