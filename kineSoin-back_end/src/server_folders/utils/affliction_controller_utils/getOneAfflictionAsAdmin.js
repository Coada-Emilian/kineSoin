/**
 * @function getOneAfflictionAsAdmin
 * @description
 * Retrieves a single affliction with full details for administrative purposes.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Validates the affliction ID from request parameters.
 * - Fetches a specific affliction from the database using its primary key.
 * - Selects detailed fields including description and operational status.
 * - Includes related body region information.
 *
 * Behavior:
 * - Returns a detailed affliction record for admin inspection.
 * - Ensures the requested affliction exists before returning data.
 *
 * Error handling:
 * - Returns 400 if admin ID or affliction ID is invalid or missing.
 * - Returns 404 if the affliction is not found.
 * - Returns 500 for unexpected server/database errors.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.params.affliction_id` {string|number} Affliction ID to retrieve.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON object containing affliction details.
 *
 * @sideEffects
 * - No database mutations; read-only operation.
 */

import { getValidId } from '../../middlewares/getValidId.js';
import { Affliction } from '../../models/index.js';

export default async function getOneAfflictionAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  try {
    const affliction_id = getValidId(req.params.affliction_id, 'Affliction ID');

    if (!affliction_id) {
      return res.status(400).json({ message: 'Affliction ID is required.' });
    }

    const foundAffliction = await Affliction.findByPk(affliction_id, {
      attributes: [
        'id',
        'name',
        'description',
        'insurance_code',
        'is_operated',
      ],
      include: [
        {
          association: 'body_region',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!foundAffliction) {
      return res.status(404).json({ message: 'Affliction not found.' });
    } else {
      return res.status(200).json(foundAffliction);
    }
  } catch (error) {
    console.error('Error fetching affliction:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
