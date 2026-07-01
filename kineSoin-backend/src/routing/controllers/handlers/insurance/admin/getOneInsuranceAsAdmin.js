/**
 * @description Handles retrieving a single insurance organization for an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity and target insurance ID.
 * - Delegates insurance retrieval logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import getOneInsuranceService from '../../../../../services/insurance/admin/getOneInsuranceAsAdmin.js';

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

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error fetching insurance.',
    });
  }
}
