/**
 * @function createAfflictionAsAdmin
 * @description
 * Creates a new affliction record through the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Ensures the request body is not empty.
 * - Validates incoming data using Joi schema (`createdAfflictionSchema`).
 * - Creates a new affliction in the database.
 * - Associates the affliction with the admin who created it.
 *
 * Behavior:
 * - Inserts a new affliction with details such as name, description, insurance code,
 *   body region, and operational status.
 * - Returns the created affliction on success.
 *
 * Error handling:
 * - Returns 400 if admin ID is invalid.
 * - Returns 400 if request body is missing or empty.
 * - Returns 400 if validation fails.
 * - Returns 500 if creation fails or an unexpected database error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.body` {Object} Affliction data payload.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON object containing the created affliction.
 *
 * @sideEffects
 * - Creates a new affliction record in the database.
 */

import { getValidId } from '../../middlewares/getValidId.js';
import { Admin, Affliction } from '../../models/index.js';
import createdAfflictionSchema from '../joi_validations/creation_validations/createdAfflictionSchema.js';

export default async function createAfflictionAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    if (!req.body) {
      return res.status(400).json({
        message:
          'The request body cannot be empty. Please provide the necessary data.',
      });
    }

    const { error } = createdAfflictionSchema.validate(req.body);

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

    return res.status(500).json({
      message: 'Error creating affliction:',
      error: error.message,
    });
  }
}
