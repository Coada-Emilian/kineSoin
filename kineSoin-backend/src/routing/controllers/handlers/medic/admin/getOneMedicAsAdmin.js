/**
 * @description Handles retrieving a single medic for an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity and target medic ID.
 * - Delegates medic retrieval logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import getOneMedicService from '../../../../../services/medic/admin/getOneMedicAsAdmin.js';

export default async function getOneMedicAsAdmin(req, res) {
  const foundMedic = await getOneMedicService({
    adminId: req.user.id,
    medicId: req.params.medic_id,
  });

  if (!foundMedic) {
    const err = new Error('Medic not found.');
    err.statusCode = 404;
    throw err;
  }
  return res.status(200).json(foundMedic);
}
