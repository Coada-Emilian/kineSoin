/**
 * @description Deletes a body region entry from the admin panel.
 *
 * Rationale:
 * - Ensures only authenticated and validated admins can remove body regions,
 *   protecting data integrity and preventing accidental or unauthorized deletions.
 * - Keeps the controller focused on validation, existence checks, and consistent
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Uses `getValidId` and `findOrThrow` to guarantee the admin exists before
 *   performing destructive operations.
 * - Returns clear, predictable HTTP status codes for missing IDs, not‑found
 *   records, and unexpected server errors.
 */

import { Admin, Body_region } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

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
