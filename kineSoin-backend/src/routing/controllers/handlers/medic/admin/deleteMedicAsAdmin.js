/**
 * @description Handles the deletion of a medic by an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity and target medic ID.
 * - Delegates deletion logic to the service layer.
 * - Handles expected deletion errors.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import deleteMedicService from '../../../../../services/medic/admin/deleteMedicAsAdmin.js';

export default async function deleteMedicAsAdmin(req, res) {
  try {
    await deleteMedicService({
      adminId: req.admin_id,
      medicId: req.params.medic_id,
    });

    return res.status(200).json({
      message: 'Medic deleted successfully.',
    });
  } catch (error) {
    if (error.message === 'Medic not found') {
      return res.status(404).json({
        message: error.message,
      });
    }
    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error deleting medic.',
    });
  }
}
