/**
 * @description Handles the deletion of an insurance organization by an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity and target insurance ID.
 * - Delegates deletion logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import deleteInsuranceService from '../../../../../services/insurance/admin/deleteInsuranceAsAdmin.js';

export default async function deleteInsuranceAsAdmin(req, res) {
  try {
    await deleteInsuranceService({
      adminId: req.admin_id,
      insuranceId: req.params.insurance_id,
    });
    return res.status(200).json({ message: 'Insurance deleted successfully.' });
  } catch (error) {
    console.error('Error deleting insurance:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error deleting insurance.',
    });
  }
}
