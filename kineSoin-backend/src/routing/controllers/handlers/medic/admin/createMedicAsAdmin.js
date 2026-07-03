/**
 * @description Handles the creation of a medic by an authenticated admin.
 *
 * Responsibilities:
 * - Validates incoming medic data.
 * - Retrieves the authenticated admin identity.
 * - Delegates medic creation logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import createMedicService from '../../../../../services/medic/admin/createMedicAsAdmin.js';
import createdMedicSchema from '../../../../../validations/joi/creation/createdMedicSchema.js';

export default async function createMedicAsAdmin(req, res) {
  const { error } = createdMedicSchema.validate(req.body);

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }

  const createdMedic = await createMedicService({
    adminId: req.admin_id,
    medicData: req.body,
  });

  if (!createdMedic) {
    const err = new Error('Error while creating medic.');
    err.statusCode = 401;
    throw err;
  }

  return res.status(201).json({
    message: 'Medic created.',
  });
}
