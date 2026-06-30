/**
 * @description Creates a new body region entry from the admin panel.
 *
 * Rationale:
 * - Ensures only authenticated and validated admins can create new body regions,
 *   maintaining data integrity and preventing malformed entries.
 * - Keeps the controller focused on validation, error handling, and response
 *   formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Uses `getValidId` and `findOrThrow` to guarantee the admin exists before
 *   performing any write operation.
 * - Applies Joi validation to enforce a strict and predictable input structure.
 * - Returns clear, consistent HTTP status codes for validation errors,
 *   missing data, and unexpected server issues.
 */

import { Admin, Body_region } from '../../../models/index.js';
import { findOrThrow } from "../../../utils/findOrThrow.js";
import { getValidId } from "../../../utils/getValidId.js";
import createdBodyRegionSchema from '../../../validations/joi/creation/createdBodyRegionSchema.js';

export default async function createBodyRegionAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

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

    return res.status(500).json({
      message: 'Error creating body region:',
      error: error.message,
    });
  }
}
