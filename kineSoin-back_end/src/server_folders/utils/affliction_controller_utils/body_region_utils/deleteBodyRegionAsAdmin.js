/**
 * @function deleteBodyRegionAsAdmin
 * @description
 * Deletes an existing body region record through the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Validates the body region ID from request parameters.
 * - Retrieves the body region from the database.
 * - Deletes the body region record if it exists.
 *
 * Behavior:
 * - Ensures only authenticated admin requests are processed.
 * - Verifies the existence of the body region before deletion.
 * - Permanently removes the body region from the database.
 *
 * Error handling:
 * - Returns 400 if admin ID is missing or invalid.
 * - Returns 404 if the body region is not found.
 * - Returns 500 if deletion fails or an unexpected server/database error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.params.body_region_id` {string|number} Body region ID to delete.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing a success or error message.
 *
 * @sideEffects
 * - Permanently deletes a body region record from the database.
 */

import { findOrThrow } from '../../../middlewares/findOrThrow.js';
import { getValidId } from '../../../middlewares/getValidId.js';
import { Admin, Body_region } from '../../../models/index.js';

export default async function deleteBodyRegionAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const body_region_id = getValidId(
      req.params.body_region_id,
      'Body Region ID'
    );

    const foundBodyRegion = await Body_region.findByPk(body_region_id);

    if (!foundBodyRegion) {
      return res.status(404).json({ message: 'Body region not found.' });
    } else {
      const deletedBodyRegion = await foundBodyRegion.destroy();

      if (!deletedBodyRegion) {
        return res
          .status(500)
          .json({ message: 'Error while deleting body region.' });
      } else {
        return res
          .status(200)
          .json({ message: 'Body region deleted successfully.' });
      }
    }
  } catch (error) {
    console.error('Error deleting body region:', error);

    return res.status(500).json({
      message: 'Error deleting body region:',
      error: error.message,
    });
  }
}
