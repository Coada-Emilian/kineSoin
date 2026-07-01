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
import createdMedicSchema from '../../../../validations/joi/creation/createdMedicSchema.js';

export default async function createMedicAsAdmin(req, res) {
  try {
    const { error } = createdMedicSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const createdMedic = await createMedicService({
      adminId: req.admin_id,
      medicData: req.body,
    });

    if (!createdMedic) {
      return res.status(500).json({ message: 'Error while creating medic.' });
    }

    return res.status(201).json({
      message: 'Medic created.',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
