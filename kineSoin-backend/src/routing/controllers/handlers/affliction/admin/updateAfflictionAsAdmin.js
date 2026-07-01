/**
 * @description Handles updating an existing affliction by an authenticated admin.
 *
 * Responsibilities:
 * - Validates incoming update data.
 * - Retrieves the authenticated admin identity and target affliction ID.
 * - Delegates update logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import updateAfflictionService from '../../../../../services/affliction/admin/updateAfflictionAsAdmin.js';
import updatedAfflictionSchema from '../../../../../validations/joi/update/updatedAfflictionSchema.js';

export default async function updateAfflictionAsAdmin(req, res) {
  try {
    const { error } = updatedAfflictionSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const updatedAffliction = await updateAfflictionService({
      adminId: req.admin_id,
      afflictionId: req.params.affliction_id,
      afflictionData: req.body,
    });

    if (!updatedAffliction) {
      return res
        .status(500)
        .json({ message: 'Error while updating affliction.' });
    }

    return res.status(200).json({
      message: 'Affliction updated successfully',
    });
  } catch (error) {
    console.error('Error updating affliction:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error updating affliction.',
    });
  }
}
