/**
 * @description Deletes an affliction entry from the admin panel.
 *
 * Rationale:
 * - Ensures only authenticated and validated admins can remove afflictions,
 *   preserving data integrity across medical classifications.
 * - Keeps the controller focused on validation, existence checks, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Uses `getValidId` and `findOrThrow` to guarantee the admin exists before
 *   performing destructive operations.
 * - Provides clear, consistent HTTP status codes for not‑found records,
 *   invalid IDs, and unexpected server errors.
 */

import { findOrThrow } from '../../utils/findOrThrow.js';
import { getValidId } from '../../utils/getValidId.js';
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
