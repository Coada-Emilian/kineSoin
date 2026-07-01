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
  try {
    await deleteBodyRegionService({
      adminId: req.admin_id,
      bodyRegionId: req.params.body_region_id,
    });

    return res
      .status(200)
      .json({ message: 'Body region deleted successfully.' });
  } catch (error) {
    console.error('Error deleting body region:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error deleting body region.',
    });
  }
}
