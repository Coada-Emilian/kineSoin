/**
 * @description Handles retrieving a single affliction for an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity and target affliction ID.
 * - Delegates affliction retrieval logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import getOneAfflictionService from '../../../../../services/affliction/admin/getOneAfflictionAsAdmin.js';

export default async function getOneAfflictionAsAdmin(req, res) {
  const affliction = await getOneAfflictionService({
    adminId: req.user.id,
    afflictionId: req.params.affliction_id,
  });

  if (!affliction) {
    const err = new Error('Affliction not found.');
    err.statusCode = 404;
    throw err;
  }

  return res.status(200).json(affliction);
}
