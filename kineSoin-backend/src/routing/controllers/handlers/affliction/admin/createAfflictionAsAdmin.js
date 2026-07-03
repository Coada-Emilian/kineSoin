/**
 * @description Handles the creation of an affliction by an authenticated admin.
 *
 * Responsibilities:
 * - Validates incoming request data.
 * - Retrieves the authenticated admin identity from the request.
 * - Delegates affliction creation logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import createAfflictionService from '../../../../../services/affliction/admin/createAfflictionAsAdmin.js';
import createdAfflictionSchema from '../../../../../validations/joi/creation/createdAfflictionSchema.js';

export default async function createAfflictionAsAdmin(req, res) {
  const { error } = createdAfflictionSchema.validate(req.body);

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }

  const createdAffliction = await createAfflictionService({
    adminId: req.admin_id,
    afflictionData: req.body,
  });

  if (!createdAffliction) {
    const err = new Error('Error while creating affliction.');
    err.statusCode = 500;
    throw err;
  }

  return res.status(201).json({
    message: 'Affliction created.',
  });
}
