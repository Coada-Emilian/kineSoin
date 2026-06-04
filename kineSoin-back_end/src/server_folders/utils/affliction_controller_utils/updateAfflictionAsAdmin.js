/**
 * @function updateAfflictionAsAdmin
 * @description
 * Updates an existing affliction record from the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Validates the affliction ID from request parameters.
 * - Retrieves the existing affliction from the database.
 * - Ensures the affliction exists before proceeding.
 * - Ensures the request body is not empty.
 * - Merges incoming data with existing affliction values for partial updates.
 * - Validates the final merged object using Joi schema (`updatedAfflictionSchema`).
 * - Updates the affliction record in the database.
 *
 * Behavior:
 * - Supports partial updates (only provided fields are modified).
 * - Keeps existing values when fields are not provided in the request.
 * - Ensures data integrity through schema validation before updating.
 *
 * Error handling:
 * - Returns 400 if admin ID is invalid or missing.
 * - Returns 400 if request body is empty or invalid.
 * - Returns 404 if the affliction does not exist.
 * - Returns 400 if validation fails.
 * - Returns 500 for unexpected server/database errors.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.params.affliction_id` {string|number} Affliction ID to update.
 *   - `req.body` {Object} Affliction update data payload.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response confirming update or describing errors.
 *
 * @sideEffects
 * - Updates an existing affliction record in the database.
 */

import { getValidId } from '../../middlewares/getValidId.js';
import { Affliction } from '../../models/index.js';
import updatedAfflictionSchema from '../joi_validations/update_validations/updatedAfflictionSchema.js';

export default async function updateAfflictionAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const affliction_id = getValidId(
        req.params.affliction_id,
        'Affliction ID'
      );

      const foundAffliction = await Affliction.findByPk(affliction_id);

      if (!foundAffliction) {
        console.error('Affliction not found');
        return res.status(404).json({ message: 'Affliction not found.' });
      }

      if (!req.body) {
        console.error('Request body is empty or invalid');
        return res.status(400).json({
          message:
            'The request body cannot be empty. Please provide the necessary data.',
        });
      }

      const { body_region_id, name, description, insurance_code, is_operated } =
        req.body;

      const newAffliction = {
        body_region_id: body_region_id || foundAffliction.body_region_id,
        name: name || foundAffliction.name,
        description: description || foundAffliction.description,
        insurance_code: insurance_code || foundAffliction.insurance_code,
        is_operated: is_operated || foundAffliction.is_operated,
        admin_id,
      };

      const { error } = updatedAfflictionSchema.validate(newAffliction);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const updatedAffliction = await foundAffliction.update(newAffliction);

      if (!updatedAffliction) {
        console.error('Error while updating affliction');
        return res
          .status(500)
          .json({ message: 'Error while updating affliction.' });
      } else {
        console.log('Affliction updated successfully');
        return res.status(200).json({
          message: 'Affliction updated successfully',
        });
      }
    } catch (error) {
      console.error('Error updating affliction:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
