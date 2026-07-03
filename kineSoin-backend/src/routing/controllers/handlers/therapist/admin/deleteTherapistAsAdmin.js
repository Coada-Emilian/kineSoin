/**
 * @description Handles the deletion of a therapist by an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity and target therapist ID.
 * - Delegates deletion logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import deleteTherapistService from '../../../../../services/therapist/admin/deleteTherapistAsAdmin.js';

export default async function deleteTherapistAsAdmin(req, res) {
  await deleteTherapistService({
    adminId: req.admin_id,
    therapistId: req.params.therapist_id,
  });

  return res.status(200).json({
    message: 'Therapist deleted successfully!',
  });
}
