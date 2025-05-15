/**
 * @description Creates a new affliction entry in the database for administrative use.
 *
 * This controller method handles:
 *
 * - `createAffliction(req, res)`:
 *   - Parses and validates the `admin_id` from the request.
 *   - Validates the request body using a Joi schema, ensuring:
 *     - `body_region_id` is a required integer.
 *     - `name` is a required string (max 50 chars).
 *     - `description` is a required string.
 *     - `insurance_code` is a required string (max 255 chars).
 *     - `is_operated` is a required boolean.
 *   - Creates a new affliction with the provided data.
 *   - Returns:
 *     - `400` if `admin_id` is missing or validation fails.
 *     - `500` if creation fails due to a server error.
 *     - `201` with the newly created affliction on success.
 *
 * Additional safeguards:
 * - Validates numeric inputs with `checkIsValidNumber`.
 * - Logs internal errors to the console for debugging.
 * - Ensures the request body is not empty.
 *
 * @module createAffliction
 * @requires Joi - For validating the request body schema.
 * @requires Affliction - Sequelize model representing the `afflictions` table.
 * @requires checkIsValidNumber - Utility function to ensure numeric ID inputs are valid.
 */

import Joi from 'joi';
import { Affliction } from '../../models/associations.js';
import { checkIsValidNumber } from '../checkIsValidNumber.js';

export default async function createAffliction(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const newAfflictionSchema = Joi.object({
        body_region_id: Joi.number().integer().required(),
        name: Joi.string().max(50).required(),
        description: Joi.string().required(),
        insurance_code: Joi.string().max(255).required(),
        is_operated: Joi.boolean().required(),
      });

      if (!req.body) {
        return res.status(400).json({
          message:
            'The request body cannot be empty. Please provide the necessary data.',
        });
      }

      const { error } = newAfflictionSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      } else {
        const newAffliction = await Affliction.create({
          admin_id,
          body_region_id: req.body.body_region_id,
          name: req.body.name,
          description: req.body.description,
          insurance_code: req.body.insurance_code,
          is_operated: req.body.is_operated,
        });

        if (!newAffliction) {
          return res
            .status(500)
            .json({ message: 'Error while creating affliction.' });
        } else {
          return res.status(201).json(newAffliction);
        }
      }
    } catch (error) {
      console.error('Error creating affliction:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
