/**
 * @function createInsuranceOrganismAsAdmin
 * @description
 * Creates a new insurance organism (insurance provider) through the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Ensures the request body is provided.
 * - Validates incoming data using Joi schema (`createdInsuranceSchema`).
 * - Extracts insurance-related fields from the request body.
 * - Builds a normalized insurance object including a computed full phone number.
 * - Creates a new insurance record in the database using `Insurance.create`.
 *
 * Behavior:
 * - Ensures only valid and complete insurance data is persisted.
 * - Standardizes phone number format by combining prefix and phone number.
 * - Associates the created insurance organism with the admin ID.
 *
 * Error handling:
 * - Returns 400 if admin ID is missing or invalid.
 * - Returns 400 if request body is missing.
 * - Returns 400 if validation fails.
 * - Returns 400 if creation fails.
 * - Returns 500 if a database or unexpected server error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.body` {Object} Insurance data.
 *     - `name` {string} Insurance name.
 *     - `amc_code` {string} AMC code.
 *     - `street_number` {string|number} Street number.
 *     - `street_name` {string} Street name.
 *     - `postal_code` {string} Postal code.
 *     - `city` {string} City.
 *     - `phone_number` {string} Phone number.
 *     - `prefix` {string} Phone prefix.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 200: Insurance organism created successfully
 *   - 400: Validation error, missing data, or creation failure
 *   - 500: Internal server error
 *
 * @sideEffects
 * - Inserts a new insurance organism record into the database.
 */

import { findOrThrow } from '../../../middlewares/findOrThrow.js';
import { getValidId } from '../../../middlewares/getValidId.js';
import { Admin, Insurance } from '../../../models/associations.js';
import createdInsuranceSchema from '../../joi_validations/creation_validations/createdInsuranceSchema.js';

export default async function createInsuranceOrganismAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    if (!req.body) {
      return res.status(400).json({
        message: 'Request body is missing. Please provide the necessary data.',
      });
    }
    const { error } = createdInsuranceSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const {
      name,
      amc_code,
      street_number,
      street_name,
      postal_code,
      city,
      phone_number,
      prefix,
    } = req.body;

    const sentInsurance = {
      admin_id,
      name,
      amc_code,
      street_number,
      street_name,
      postal_code,
      city,
      phone_number,
      prefix,
      full_phone_number: `${prefix}${phone_number}`,
    };

    const response = await Insurance.create(sentInsurance);
    if (response) {
      return res
        .status(200)
        .json({ message: 'Insurance organism created', response });
    } else {
      return res
        .status(400)
        .json({ message: 'Insurance organism not created', response });
    }
  } catch (error) {
    console.error('Error creating insurance:', error);

    return res.status(500).json({
      message: 'Error creating insurance:',
      error: error.message,
    });
  }
}
