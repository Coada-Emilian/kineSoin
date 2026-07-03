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
  const afflictions = await getAllAfflictionsService({
    adminId: req.admin_id,
  });

  if (afflictions.length === 0) {
    const err = new Error('No afflictions found.');
    err.statusCode = 404;
    throw err;
  }
  return res.status(200).json(afflictions);
}
