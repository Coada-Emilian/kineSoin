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
  const foundInsurance = await getOneInsuranceService({
    adminId: req.user.id,
    insuranceId: req.params.insurance_id,
  });

  if (!foundInsurance) {
    const err = new Error('Insurance not found.');
    err.statusCode = 404;
    throw err;
  }

  return res.status(200).json(foundInsurance);
}
