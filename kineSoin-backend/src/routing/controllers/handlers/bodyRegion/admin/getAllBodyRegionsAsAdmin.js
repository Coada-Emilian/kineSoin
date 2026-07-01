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
  try {
    const body_regions = await getAllBodyRegionsService({
      adminId: req.admin_id,
    });

    if (body_regions.length === 0) {
      return res.status(404).json({ message: 'No body regions found.' });
    }

    return res.status(200).json(body_regions);
  } catch (error) {
    console.error('Error fetching body regions:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error fetching body regions.',
    });
  }
}
