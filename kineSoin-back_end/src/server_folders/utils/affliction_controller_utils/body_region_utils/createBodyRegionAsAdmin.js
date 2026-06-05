/**
 * @function createBodyRegionAsAdmin
 * @description
 * Creates a new body region record through the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Ensures the request body is not empty.
 * - Validates incoming data using Joi schema (`createdBodyRegionSchema`).
 * - Creates a new body region in the database using `Body_region.create`.
 * - Associates the created record with the admin ID.
 *
 * Behavior:
 * - Ensures only valid and well-structured data is persisted.
 * - Prevents creation of invalid or malformed body region entries.
 * - Returns the newly created body region on success.
 *
 * Error handling:
 * - Returns 400 if admin ID is missing or invalid.
 * - Returns 400 if request body is empty.
 * - Returns 400 if validation fails.
 * - Returns 500 if creation fails or an unexpected server/database error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.body` {Object} Body region data.
 *     - `name` {string} Name of the body region.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 201: Newly created body region object
 *   - 400: Validation or missing data errors
 *   - 500: Internal server error
 *
 * @sideEffects
 * - Inserts a new body region record into the database.
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Body_region } from '../../../models/index.js';
import createdBodyRegionSchema from '../../joi_validations/creation_validations/createdBodyRegionSchema.js';

export default async function createBodyRegionAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      if (!req.body) {
        return res.status(400).json({
          message:
            'The request body cannot be empty. Please provide the necessary data.',
        });
      }

      const { error } = createdBodyRegionSchema.validate(req.body);

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
