/**
 * @description Handles the deletion of a body region by an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity and target body region ID.
 * - Delegates deletion logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import deleteBodyRegionService from '../../../../../services/bodyRegion/admin/deleteBodyRegionAsAdmin.js';

export default async function deleteBodyRegionAsAdmin(req, res) {
  await deleteBodyRegionService({
    adminId: req.user.id,
    bodyRegionId: req.params.body_region_id,
  });

  return res.status(200).json({ message: 'Body region deleted successfully.' });
}
