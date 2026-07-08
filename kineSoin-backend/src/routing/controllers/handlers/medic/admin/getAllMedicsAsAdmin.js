/**
 * @description Handles retrieving all medics for an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity.
 * - Delegates medic retrieval logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import getAllMedicsService from '../../../../../services/medic/admin/getAllMedicsAsAdmin.js';

export default async function getAllMedicsAsAdmin(req, res) {
  const medics = await getAllMedicsService({ adminId: req.user.id });

  if (medics.length === 0) {
    const err = new Error('No medics found.');
    err.statusCode = 404;
    throw err;
  }
  return res.status(200).json(medics);
}
