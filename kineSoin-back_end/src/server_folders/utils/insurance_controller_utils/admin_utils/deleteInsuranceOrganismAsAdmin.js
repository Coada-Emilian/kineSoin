/**
 * @function deleteInsuranceOrganismAsAdmin
 * @description
 * Deletes an insurance organism (insurance provider) through the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Validates the insurance ID from request parameters.
 * - Retrieves the insurance record from the database.
 * - Deletes the insurance record if it exists.
 *
 * Behavior:
 * - Ensures only authenticated admin requests are processed.
 * - Verifies existence of the insurance organism before deletion.
 * - Permanently removes the insurance record from the database.
 *
 * Error handling:
 * - Returns 400 if admin ID is missing or invalid.
 * - Returns 400 if insurance is not found.
 * - Returns 400 if deletion fails.
 * - Returns 500 if a database or unexpected server error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.params.insurance_id` {string|number} Insurance ID to delete.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 200: Success message and deletion response
 *   - 400: Missing/invalid admin ID, not found, or deletion failure
 *   - 500: Internal server error
 *
 * @sideEffects
 * - Permanently deletes an insurance organism record from the database.
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Insurance } from '../../../models/index.js';

export default async function deleteInsuranceOrganismAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const insurance_id = getValidId(req.params.insurance_id, 'Insurance ID');

      const foundInsurance = await Insurance.findByPk(insurance_id);

      if (!foundInsurance) {
        return res.status(400).json({ message: 'Insurance not found' });
      } else {
        const response = await foundInsurance.destroy();

        if (response) {
          return res
            .status(200)
            .json({ message: 'The insurance was deleted', response });
        } else {
          return res
            .status(400)
            .json({ message: 'The insurance was not deleted', response });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting insurance.' });
    }
  }
}
