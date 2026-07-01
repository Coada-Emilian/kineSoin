/**
 * @description Handles updating an existing medic by an authenticated admin.
 *
 * Responsibilities:
 * - Validates incoming update data.
 * - Retrieves the authenticated admin identity and target medic ID.
 * - Delegates update logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import updateMedicService from '../../../../../services/medic/admin/updateMedicAsAdmin.js';
import updatedMedicSchema from '../../../../../validations/joi/update/updatedMedicSchema.js';

export default async function updateMedicAsAdmin(req, res) {
  try {
    const { error } = updatedMedicSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const updatedMedic = await updateMedicService({
      adminId: req.admin_id,
      medicId: req.params.medic_id,
      medicData: req.body,
    });

    if (!updatedMedic) {
      return res.status(500).json({ message: 'Error while updating medic.' });
    }

    return res.status(200).json({
      message: 'Medic updated successfully.',
    });
  } catch (error) {
    console.error('Error updating medic:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error updating medic.',
    });
  }
}
