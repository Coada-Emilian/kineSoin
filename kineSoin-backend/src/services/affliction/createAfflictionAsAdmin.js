/**
 * @description Creates a new affliction entry from the admin panel.
 *
 * Rationale:
 * - Ensures only authenticated and validated admins can create afflictions,
 *   maintaining strict data integrity across medical classifications.
 * - Keeps the controller focused on validation, structured input handling,
 *   and predictable response formatting while delegating persistence to
 *   Sequelize models.
 *
 * Notes:
 * - Applies Joi validation to enforce a consistent and safe input schema.
 * - Uses `getValidId` and `findOrThrow` to guarantee the admin exists before
 *   performing any write operation.
 * - Returns clear, predictable HTTP status codes for validation errors,
 *   missing data, and unexpected server issues.
 */

import { Admin, Affliction } from '../../models/index.js';
import { findOrThrow } from '../../utils/findOrThrow.js';
import { getValidId } from '../../utils/getValidId.js';
import createdAfflictionSchema from '../../validations/joi/creation/createdAfflictionSchema.js';

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
