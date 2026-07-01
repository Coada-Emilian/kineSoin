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
  try {
    const { error } = createdBodyRegionSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const createdBodyRegion = await createBodyRegionService({
      adminId: req.admin_id,
      bodyRegionData: req.body,
    });

    if (!createdBodyRegion) {
      return res
        .status(500)
        .json({ message: 'Error while creating body region.' });
    }

    return res.status(201).json({
      message: 'Body region created.',
    });
  } catch (error) {
    console.error('Error creating body region:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error creating body region.',
    });
  }
}
