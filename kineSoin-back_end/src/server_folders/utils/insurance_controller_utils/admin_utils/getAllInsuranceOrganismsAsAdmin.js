/**
 * @function getAllInsuranceOrganismsAsAdmin
 * @description
 * Retrieves all insurance organisms (insurance providers) for the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Fetches all insurance records from the database using `Insurance.findAll`.
 * - Selects only required attributes (id, name, amc_code).
 * - Formats the data before sending the response.
 *
 * Behavior:
 * - Ensures only authenticated admin requests are processed.
 * - Returns a simplified and structured list of insurance organisms.
 * - Provides consistent output formatting for frontend consumption.
 *
 * Error handling:
 * - Returns 400 if admin ID is missing or invalid.
 * - Returns 400 if no insurance records are found.
 * - Returns 500 if a database or unexpected server error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 200: Array of insurance organisms `{ id, name, amc_code }`
 *   - 400: Missing/invalid admin ID or no data found
 *   - 500: Internal server error
 *
 * @sideEffects
 * - None (read-only database operation).
 */

import { findOrThrow } from '../../../middlewares/findOrThrow.js';
import { getValidId } from '../../../middlewares/getValidId.js';
import { Admin, Insurance } from '../../../models/index.js';

export default async function getAllInsuranceOrganismsAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const allInsurances = await Insurance.findAll({
      attributes: ['id', 'name', 'amc_code'],
    });

    if (!allInsurances) {
      return res.status(400).json({ message: 'No insurance found' });
    } else {
      const allInsurancesData = allInsurances.map((insurance) => ({
        id: insurance.id,
        name: insurance.name,
        amc_code: insurance.amc_code,
      }));

      return res.status(200).json(allInsurancesData);
    }
  } catch (error) {
    console.error('Error fetching insurances:', error);

    return res.status(500).json({
      message: 'Error fetching insurances:',
      error: error.message,
    });
  }
}
