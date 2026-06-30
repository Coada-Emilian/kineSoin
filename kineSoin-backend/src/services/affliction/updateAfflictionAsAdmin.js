/**
 * @description Updates an existing affliction entry from the admin panel.
 *
 * Rationale:
 * - Ensures only authenticated and validated admins can modify afflictions,
 *   preserving the integrity of medical classifications and preventing malformed
 *   updates.
 * - Keeps the controller focused on validation, structured merging of incoming
 *   data, and predictable response formatting while delegating persistence to
 *   Sequelize models.
 *
 * Notes:
 * - Uses `getValidId` and `findOrThrow` to guarantee the admin exists before
 *   performing any write operation.
 * - Applies Joi validation to enforce a strict and safe update schema.
 * - Returns clear, consistent HTTP status codes for invalid IDs, missing records,
 *   validation failures, and unexpected server errors.
 */

import { Admin, Affliction } from '../../models/index.js';
import { findOrThrow } from '../../utils/findOrThrow.js';
import { getValidId } from '../../utils/getValidId.js';
import updatedAfflictionSchema from '../../validations/joi/update/updatedAfflictionSchema.js';

export default async function updateAfflictionAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const affliction_id = getValidId(req.params.affliction_id, 'Affliction ID');

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

    return res.status(500).json({
      message: 'Error updating affliction:',
      error: error.message,
    });
  }
}
