/**
 * @description Retrieves an alphabetized list of all body regions for admin use.
 *
 * Rationale:
 * - Ensures only authenticated and validated admins can access body‑region data,
 *   maintaining a clear separation between privileged and public operations.
 * - Keeps the controller focused on validation, existence checks, and predictable
 *   response formatting while delegating data access to Sequelize models.
 *
 * Notes:
 * - Returns a lightweight, consistently shaped array of `{ id, name }` objects
 *   for easy frontend consumption.
 * - Uses `getValidId` and `findOrThrow` to guarantee the admin exists before
 *   performing any read operation.
 * - Provides clear, predictable HTTP status codes for missing IDs, empty results,
 *   and unexpected server errors.
 */

import { Admin, Body_region } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAllBodyRegionsAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const foundBodyRegions = await Body_region.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']],
    });

    if (!foundBodyRegions) {
      return res.status(404).json({ message: 'No body regions found.' });
    } else {
      const BodyRegionsData = foundBodyRegions.map((bodyRegion) => ({
        id: bodyRegion.id,
        name: bodyRegion.name,
      }));

      return res.status(200).json(BodyRegionsData);
    }
  } catch (error) {
    console.error('Error fetching body regions:', error);

    return res.status(500).json({
      message: 'Error fetching body regions:',
      error: error.message,
    });
  }
}
