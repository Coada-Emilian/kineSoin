/**
 * @description Handles retrieving all therapists for an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity.
 * - Delegates therapist retrieval logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import getAllTherapistsService from '../../../../../services/therapist/admin/getAllTherapistsAsAdmin.js';

export default async function getAllTherapistsAsAdmin(req, res) {
  const therapists = await getAllTherapistsService({ adminId: req.user.id });

  if (therapists.length === 0) {
    const err = new Error('No therapists found.');
    err.statusCode = 404;
    throw err;
  }

  return res.status(200).json(therapists);
}
