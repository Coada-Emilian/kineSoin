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
  const { error } = updatedAfflictionSchema.validate(req.body);

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }

  const updatedAffliction = await updateAfflictionService({
    adminId: req.admin_id,
    afflictionId: req.params.affliction_id,
    afflictionData: req.body,
  });

  if (!updatedAffliction) {
    const err = new Error('Error while updating affliction.');
    err.statusCode = 500;
    throw err;
  }

  return res.status(200).json({
    message: 'Affliction updated successfully',
  });
}
