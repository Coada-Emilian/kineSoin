/**
 * @function getAllAfflictionsAsAdmin
 * @description
 * Retrieves all afflictions for administrative purposes.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Fetches all afflictions from the database.
 * - Selects only relevant fields for admin display and efficiency.
 * - Orders results by body region and name for better organization.
 * - Includes related body region information for each affliction.
 *
 * Behavior:
 * - Returns a list of afflictions with minimal required data for admin use.
 * - Provides associated body region details when available.
 *
 * Error handling:
 * - Returns 400 if admin ID is invalid or missing.
 * - Returns 404 if no afflictions are found.
 * - Returns 500 for unexpected server/database errors.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object[]} JSON array of afflictions with associated body region data.
 *
 * @sideEffects
 * - No database mutations; read-only operation.
 */

import { findOrThrow } from '../../middlewares/findOrThrow.js';
import { getValidId } from '../../middlewares/getValidId.js';
import { Admin, Affliction } from '../../models/index.js';

export default async function getAllAfflictionsAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const foundAfflictions = await Affliction.findAll({
      attributes: [
        'id',
        'name',
        // 'description',
        'insurance_code',
        'is_operated',
        'body_region_id',
      ],
      order: [
        ['body_region_id', 'ASC'],
        ['name', 'ASC'],
      ],
      include: [
        {
          association: 'body_region',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!foundAfflictions) {
      return res.status(404).json({ message: 'No afflictions found.' });
    } else {
      return res.status(200).json(foundAfflictions);
    }
  } catch (error) {
    console.error('Error fetching afflictions:', error);

    return res.status(500).json({
      message: 'Error fetching afflictions:',
      error: error.message,
    });
  }
}
