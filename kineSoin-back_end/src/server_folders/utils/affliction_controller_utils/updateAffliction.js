/**
 * @description Updates an existing affliction record in the database.
 *
 * This controller performs the following steps:
 *
 * - `updateAffliction(req, res)`:
 *   - Parses and validates `admin_id` from the request context.
 *   - Parses and validates `affliction_id` from request parameters.
 *   - Validates the presence and structure of the request body.
 *   - Uses Joi to validate the shape of the update payload (`body_region_id`, `name`, `description`, `insurance_code`, `is_operated`).
 *   - Dynamically builds the `newAffliction` update object based on available fields.
 *   - Updates the affliction record in the database using Sequelize.
 *   - Returns:
 *     - `400` if any required IDs or body values are missing or invalid.
 *     - `404` if the affliction to update does not exist.
 *     - `500` if a server-side error occurs.
 *     - `200` with a success message if the update is successful.
 *
 * Input notes:
 * - `is_operated` can be a string ("true" or "false") and is normalized to a boolean.
 * - `checkIsValidNumber` ensures that numeric parameters are strictly valid.
 *
 * @module updateAffliction
 * @requires Affliction - Sequelize model representing the `afflictions` table.
 * @requires checkIsValidNumber - Utility function for strict numeric validation.
 * @requires Joi - Validation library used to validate and enforce schema rules.
 */

import Joi from 'joi';
import { Affliction } from '../../models/associations.js';
import { checkIsValidNumber } from '../checkIsValidNumber.js';

export default async function updateAffliction(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const affliction_id = parseInt(req.params.affliction_id, 10);

      checkIsValidNumber(affliction_id);

      if (!affliction_id) {
        return res.status(400).json({ message: 'Affliction ID is required.' });
      }

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
        ...(body_region_id
          ? { body_region_id: parseInt(body_region_id, 10) }
          : {}),
        ...(name ? { name } : {}),
        ...(description ? { description } : {}),
        ...(insurance_code ? { insurance_code } : {}),
        ...(is_operated === 'true' || is_operated === 'false'
          ? { is_operated: is_operated === 'true' }
          : {}),
        admin_id,
      };

      // Validate newAffliction object using Joi
      const updatedAfflictionSchema = Joi.object({
        body_region_id: Joi.number().integer().optional(),
        name: Joi.string().max(50).optional(),
        description: Joi.string().optional(),
        insurance_code: Joi.string().max(255).optional(),
        is_operated: Joi.boolean().optional(),
      }).min(1);

      const { error } = updatedAfflictionSchema.validate(newAffliction);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      // Perform the update
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
