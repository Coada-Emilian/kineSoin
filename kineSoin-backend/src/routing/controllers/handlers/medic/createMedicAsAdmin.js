/**
 * @description Handles the HTTP request for creating a medic from the admin panel.
 *
 * Responsibilities:
 * - Extracts required data from the incoming request.
 * - Delegates medic creation logic to the dedicated service layer.
 * - Returns appropriate HTTP responses based on the operation result.
 *
 * Notes:
 * - This layer only manages HTTP concerns.
 * - Business rules and database operations are handled by the service.
 */

import createMedicService from '../../../../services/medic/admin/createMedicAsAdmin.js';

export default async function createMedicAsAdmin(req, res) {
  try {
    const createdMedic = await createMedicService({
      adminId: req.admin_id,
      medicData: req.body,
    });

    return res.status(201).json({
      message: 'Medic created.',
      createdMedic,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
