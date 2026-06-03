/**
 * @description Handles the creation of new body regions by administrators.
 *
 * This controller method is responsible for:
 *
 * - `createBodyRegion(req, res)`:
 *   - Extracts and validates the `admin_id` from the request.
 *   - Validates the request body using a Joi schema to ensure a valid `name` is provided.
 *   - Uses Sequelize to create a new `Body_region` entry in the database.
 *   - Returns:
 *     - `400` if `admin_id` is missing or the request body is invalid.
 *     - `500` if a server or database error occurs.
 *     - `201` with the newly created body region object if successful.
 *
 * All logic ensures:
 * - Admin ID is a valid number using `checkIsValidNumber`.
 * - Request body is not empty and contains required fields.
 * - Proper error handling and HTTP status responses are returned.
 *
 * @module createBodyRegion
 * @requires Joi - For validating the request body schema.
 * @requires Body_region - Sequelize model representing the `body_regions` table.
 * @requires checkIsValidNumber - Utility function for validating numeric inputs.
 */

import Joi from 'joi';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Body_region } from '../../../models/index.js';

export default async function createBodyRegion(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const newBodyRegionSchema = Joi.object({
        name: Joi.string().max(50).required(),
      });

      if (!req.body) {
        return res.status(400).json({
          message:
            'The request body cannot be empty. Please provide the necessary data.',
        });
      }

      const { error } = newBodyRegionSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      } else {
        const newBodyRegion = await Body_region.create({
          admin_id,
          name: req.body.name,
        });

        if (!newBodyRegion) {
          return res
            .status(500)
            .json({ message: 'Error while creating body region.' });
        } else {
          return res.status(201).json(newBodyRegion);
        }
      }
    } catch (error) {
      console.error('Error creating body region:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
