/**
 * @function deleteAfflictionAsAdmin
 * @description
 * Deletes an affliction record from the system through the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Validates the affliction ID from request parameters.
 * - Retrieves the affliction from the database.
 * - Permanently deletes the affliction if it exists.
 *
 * Behavior:
 * - Ensures the affliction exists before attempting deletion.
 * - Performs a hard delete of the affliction record.
 *
 * Error handling:
 * - Returns 400 if admin ID is invalid.
 * - Returns 404 if the affliction is not found.
 * - Returns 500 if deletion fails or an unexpected database error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.params.affliction_id` {string|number} Affliction ID to delete.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response confirming deletion or describing errors.
 *
 * @sideEffects
 * - Permanently removes an affliction record from the database.
 */

import { findOrThrow } from '../../middlewares/findOrThrow.js';
import { getValidId } from '../../middlewares/getValidId.js';
import { Admin, Affliction } from '../../models/index.js';

export default async function deleteAfflictionAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const affliction_id = getValidId(req.params.affliction_id, 'Affliction ID');

    const foundAffliction = await Affliction.findByPk(affliction_id);

    if (!foundAffliction) {
      return res.status(404).json({ message: 'Affliction not found.' });
    } else {
      const deletedAffliction = await foundAffliction.destroy();

      if (!deletedAffliction) {
        return res
          .status(500)
          .json({ message: 'Error while deleting affliction.' });
      } else {
        return res
          .status(200)
          .json({ message: 'Affliction deleted successfully.' });
      }
    }
  } catch (error) {
    console.error('Error deleting affliction:', error);

    return res.status(500).json({
      message: 'Error deleting affliction:',
      error: error.message,
    });
  }
}
