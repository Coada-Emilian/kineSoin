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
  const { error } = updatedMedicSchema.validate(req.body);

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }

  const updatedMedic = await updateMedicService({
    adminId: req.user.id,
    medicId: req.params.medic_id,
    medicData: req.body,
  });

  if (!updatedMedic) {
    const err = new Error('Error while updating medic.');
    err.statusCode = 500;
    throw err;
  }

  return res.status(200).json({
    message: 'Medic updated successfully.',
  });
}
