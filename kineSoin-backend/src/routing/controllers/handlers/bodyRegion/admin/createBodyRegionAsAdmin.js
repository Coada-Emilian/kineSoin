/**
 * @description Handles the creation of a body region by an authenticated admin.
 *
 * Responsibilities:
 * - Validates incoming request data.
 * - Retrieves the authenticated admin identity.
 * - Delegates body region creation logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import createBodyRegionService from '../../../../../services/bodyRegion/admin/createBodyRegionAsAdmin.js';
import createdBodyRegionSchema from '../../../../../validations/joi/creation/createdBodyRegionSchema.js';

export default async function createBodyRegionAsAdmin(req, res) {
  const { error } = createdBodyRegionSchema.validate(req.body);

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }

  const createdBodyRegion = await createBodyRegionService({
    adminId: req.user.id,
    bodyRegionData: req.body,
  });

  if (!createdBodyRegion) {
    const err = new Error('Error while creating body region.');
    err.statusCode = 401;
    throw err;
  }

  return res.status(201).json({
    message: 'Body region created.',
  });
}
