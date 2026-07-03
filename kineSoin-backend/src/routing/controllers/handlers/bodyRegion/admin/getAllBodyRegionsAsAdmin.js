/**
 * @description Handles retrieving all body regions for an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity.
 * - Delegates body region retrieval logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import getAllBodyRegionsService from '../../../../../services/bodyRegion/admin/getAllBodyRegionsAsAdmin.js';

export default async function getAllBodyRegionsAsAdmin(req, res) {
  const body_regions = await getAllBodyRegionsService({
    adminId: req.admin_id,
  });

  if (body_regions.length === 0) {
    const err = new Error('No body regions found.');
    err.statusCode = 404;
    throw err;
  }

  return res.status(200).json(body_regions);
}
