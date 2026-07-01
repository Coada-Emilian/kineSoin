/**
 * @description Handles retrieving all afflictions available to an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity.
 * - Delegates affliction retrieval logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import getAllAfflictionsService from '../../../../../services/affliction/admin/getAllAfflictionsAsAdmin.js';

export default async function getAllAfflictionsAsAdmin(req, res) {
  try {
    const afflictions = await getAllAfflictionsService({
      adminId: req.admin_id,
    });

    if (afflictions.length === 0) {
      return res.status(404).json({ message: 'No afflictions found.' });
    }
    return res.status(200).json(afflictions);
  } catch (error) {
    console.error('Error fetching afflictions:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error fetching afflictions.',
    });
  }
}
