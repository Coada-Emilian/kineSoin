/**
 * @function createMedicAsAdmin
 * @description
 * Creates a new medic record through the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Ensures the request body is present.
 * - Validates incoming medic data using the Joi schema (`createdMedicSchema`).
 * - Generates a formatted full phone number from the prefix and phone number.
 * - Creates a new medic record in the database.
 * - Returns the newly created medic upon success.
 *
 * Behavior:
 * - Associates the newly created medic with the authenticated admin.
 * - Combines prefix and phone number into a single `full_phone_number` field.
 * - Persists the medic record in the database after successful validation.
 *
 * Error handling:
 * - Returns 400 if admin ID is invalid or missing.
 * - Returns 400 if the request body is empty.
 * - Returns 400 if validation fails.
 * - Returns 500 if medic creation fails.
 * - Returns 500 for unexpected server/database errors.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.body` {Object} Medic creation data.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing the created medic or an error message.
 *
 * @sideEffects
 * - Creates a new medic record in the database.
 */

import { findOrThrow } from '../../../middlewares/findOrThrow.js';
import { getValidId } from '../../../middlewares/getValidId.js';
import { Admin, Medic } from '../../../models/index.js';
import createdMedicSchema from '../../joi_validations/creation_validations/createdMedicSchema.js';

export default async function createMedicAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    if (!req.body) {
      return res.status(400).json({
        message:
          'The request body cannot be empty. Please provide the necessary data.',
      });
    } else {
      const { error } = createdMedicSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const full_phone_number = req.body.prefix + req.body.phone_number;

      const newMedic = {
        admin_id,
        ...req.body,
        full_phone_number,
      };

      const createdMedic = await Medic.create(newMedic);

      if (!createdMedic) {
        return res.status(500).json({
          message: 'Error while creating medic because fuck you.',
        });
      } else {
        return res
          .status(201)
          .json({ message: 'Medic created.', createdMedic });
      }
    }
  } catch (error) {
    console.error('Error creating medic:', error);

    return res.status(500).json({
      message: 'Error creating medic:',
      error: error.message,
    });
  }
}
