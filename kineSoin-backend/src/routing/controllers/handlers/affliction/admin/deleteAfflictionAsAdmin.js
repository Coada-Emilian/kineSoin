/**
 * @description Handles the deletion of an affliction by an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity and target affliction ID.
 * - Delegates deletion logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import deleteAfflictionService from '../../../../../services/affliction/admin/deleteAfflictionAsAdmin.js';

export default async function deleteAfflictionAsAdmin(req, res) {
  try {
    await deleteAfflictionService({
      adminId: req.admin_id,
      afflictionId: req.params.affliction_id,
    });

    return res.status(200).json({
      message: 'Affliction deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting affliction:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error deleting affliction.',
    });
  }
}
