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
  try {
    const { error } = createdAfflictionSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const createdAffliction = await createAfflictionService({
      adminId: req.admin_id,
      afflictionData: req.body,
    });

    if (!createdAffliction) {
      return res
        .status(500)
        .json({ message: 'Error while creating affliction.' });
    }

    return res.status(201).json({
      message: 'Affliction created.',
    });
  } catch (error) {
    console.error('Error creating affliction:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error creating affliction.',
    });
  }
}
