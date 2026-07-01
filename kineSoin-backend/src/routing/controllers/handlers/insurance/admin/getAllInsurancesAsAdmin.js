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
  try {
    const insurances = await getAllInsurancesService({ adminId: req.admin_id });

    if (insurances.length === 0) {
      return res.status(404).json({ message: 'No insurances found.' });
    }
    return res.status(200).json(insurances);
  } catch (error) {
    console.error('Error fetching insurances:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error fetching insurances.',
    });
  }
}
