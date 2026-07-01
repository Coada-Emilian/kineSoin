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
  try {
    const therapists = await getAllTherapistsService({ adminId: req.admin_id });

    if (therapists.length === 0) {
      return res.status(404).json({ message: 'No therapists found.' });
    }

    return res.status(200).json(therapists);
  } catch (error) {
    console.error('Error fetching therapists:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error fetching therapists.',
    });
  }
}
