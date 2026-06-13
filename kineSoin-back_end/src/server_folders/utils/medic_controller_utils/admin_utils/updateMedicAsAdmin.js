/**
 * @function updateMedicAsAdmin
 * @description
 * Updates an existing medic record through the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Validates the medic ID from request parameters.
 * - Ensures the request body is provided.
 * - Retrieves the existing medic from the database.
 * - Merges incoming data with existing medic values to support partial updates.
 * - Rebuilds the full phone number using the provided prefix and phone number.
 * - Validates the updated medic data using Joi schema (`updatedMedicSchema`).
 * - Updates the medic record in the database.
 *
 * Behavior:
 * - Supports partial updates by preserving existing values when fields are omitted.
 * - Ensures the medic exists before applying modifications.
 * - Validates all updated data before persisting changes.
 *
 * Error handling:
 * - Returns 400 if admin ID or medic ID is invalid.
 * - Returns 400 if the request body is empty.
 * - Returns 400 if validation fails.
 * - Returns 404 if the medic is not found.
 * - Returns 500 if the update fails or an unexpected server/database error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.params.medic_id` {string|number} Medic ID to update.
 *   - `req.body` {Object} Medic update data.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing the updated medic or an error message.
 *
 * @sideEffects
 * - Updates an existing medic record in the database.
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Medic } from '../../../models/index.js';
import updatedMedicSchema from '../../joi_validations/update_validations/updatedMedicSchema.js';

export default async function updateMedicAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  const medic_id = getValidId(req.params.medic_id, 'Medic ID');

  if (!req.body) {
    return res.status(400).json({
      message:
        'The request body cannot be empty. Please provide the necessary data.',
    });
  }

  try {
    const foundMedic = await Medic.findByPk(medic_id);

    if (!foundMedic) {
      return res.status(404).json({ message: 'Medic not found.' });
    }

    const {
      name,
      surname,
      street_number,
      street_name,
      postal_code,
      city,
      phone_number,
      licence_code,
      email,
      prefix,
    } = req.body;

    const newMedic = {
      admin_id: admin_id || foundMedic.admin_id,
      name: name || foundMedic.name,
      surname: surname || foundMedic.surname,
      street_number: street_number || foundMedic.street_number,
      street_name: street_name || foundMedic.street_name,
      postal_code: postal_code || foundMedic.postal_code,
      city: city || foundMedic.city,
      phone_number: phone_number || foundMedic.phone_number,
      licence_code: licence_code || foundMedic.licence_code,
      email: email || foundMedic.email,
      prefix: prefix || foundMedic.prefix,
      full_phone_number: prefix + phone_number || foundMedic.full_phone_number,
    };

    console.log('Constructed newMedic object:', newMedic);
    const { error } = updatedMedicSchema.validate(newMedic);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedMedic = await foundMedic.update(newMedic);

    if (!updatedMedic) {
      return res.status(500).json({ message: 'Error while updating medic.' });
    }

    return res.status(200).json({
      message: 'Medic updated successfully.',
      updatedMedic,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating medic.' });
  }
}
