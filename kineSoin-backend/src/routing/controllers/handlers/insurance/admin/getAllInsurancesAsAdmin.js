/**
 * @description Handles retrieving all insurance organizations for an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity.
 * - Delegates insurance retrieval logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import getAllInsurancesService from '../../../../../services/insurance/admin/getAllInsurancesAsAdmin.js';

export default async function getAllInsurancesAsAdmin(req, res) {
  const insurances = await getAllInsurancesService({ adminId: req.user.id });

  if (insurances.length === 0) {
    const err = new Error('Insurances not found.');
    err.statusCode = 404;
    throw err;
  }

  return res.status(200).json(insurances);
}
