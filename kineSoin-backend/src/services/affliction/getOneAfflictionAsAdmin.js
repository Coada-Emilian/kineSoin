/**
 * @description Retrieves a single affliction for admin use, including its body‑region metadata.
 *
 * Rationale:
 * - Ensures only authenticated and validated admins can access detailed affliction
 *   information, maintaining a strict separation between privileged and public operations.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Uses `getValidId` and `findOrThrow` to guarantee the admin exists before
 *   performing any read operation.
 * - Returns a complete affliction record enriched with its associated body region.
 * - Provides clear, consistent HTTP status codes for invalid IDs, missing records,
 *   and unexpected server errors.
 */

import { Admin, Affliction } from '../../models/index.js';
import { findOrThrow } from '../../utils/findOrThrow.js';
import { getValidId } from '../../utils/getValidId.js';

export default async function getOneAfflictionAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

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

    return res.status(500).json({
      message: 'Error fetching affliction:',
      error: error.message,
    });
  }
}
