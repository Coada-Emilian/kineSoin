/**
 * @description Handles toggling a therapist account status by an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity and target therapist ID.
 * - Delegates status change logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import toggleTherapistStatusService from '../../../../../services/therapist/admin/toggleTherapistStatusAsAdmin.js';

export default async function toggleTherapistStatusAsAdmin(req, res) {
  try {
    await toggleTherapistStatusService({
      adminId: req.admin_id,
      therapistId: req.params.therapist_id,
    });

    return res
      .status(200)
      .json({ message: 'Therapist status updated successfully!' });
  } catch (error) {
    console.error('Error toggling therapist status:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error toggling therapist status.',
    });
  }
}
