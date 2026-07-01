/**
 * @description Handles retrieving a single therapist for an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity and target therapist ID.
 * - Delegates therapist retrieval logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import getOneTherapistService from '../../../../../services/therapist/admin/getOneTherapistAsAdmin.js';

export default async function getOneTherapistAsAdmin(req, res) {
  try {
    const foundTherapist = await getOneTherapistService({
      adminId: req.admin_id,
      therapistId: req.params.therapist_id,
    });

    return res.status(200).json(foundTherapist);
  } catch (error) {
    console.error('Error fetching therapist:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error fetching therapist.',
    });
  }
}
