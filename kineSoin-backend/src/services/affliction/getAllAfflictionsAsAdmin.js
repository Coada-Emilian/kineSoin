/**
 * @description Retrieves all afflictions for admin use, grouped and ordered for clarity.
 *
 * Rationale:
 * - Ensures only authenticated and validated admins can access affliction data,
 *   maintaining strict separation between privileged and public operations.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Returns a lightweight, alphabetized list enriched with body‑region metadata
 *   for easier frontend categorization.
 * - Uses `getValidId` and `findOrThrow` to guarantee the admin exists before
 *   performing any read operation.
 * - Provides clear, consistent HTTP status codes for empty results, invalid IDs,
 *   and unexpected server errors.
 */

import { Admin, Affliction } from '../../models/index.js';
import { findOrThrow } from '../../utils/findOrThrow.js';
import { getValidId } from '../../utils/getValidId.js';

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
