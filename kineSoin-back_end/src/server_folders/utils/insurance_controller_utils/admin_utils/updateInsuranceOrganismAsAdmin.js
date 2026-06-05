/**
 * @function updateInsuranceOrganismAsAdmin
 * @description
 * Updates an existing insurance organism (insurance provider) through the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Validates the insurance ID from request parameters.
 * - Ensures the request body is provided.
 * - Validates incoming data using Joi schema (`updatedInsuranceSchema`).
 * - Retrieves the existing insurance record from the database.
 * - Merges incoming data with existing values to support partial updates.
 * - Recomputes the full phone number when applicable.
 * - Updates the insurance record in the database.
 *
 * Behavior:
 * - Supports partial updates by preserving existing values when fields are omitted.
 * - Ensures the insurance organism exists before applying modifications.
 * - Produces a consistent and updated data structure after changes.
 *
 * Error handling:
 * - Returns 400 if admin ID is missing or invalid.
 * - Returns 400 if request body is missing.
 * - Returns 400 if validation fails.
 * - Returns 400 if insurance is not found.
 * - Returns 500 if update fails or an unexpected server/database error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.params.insurance_id` {string|number} Insurance ID to update.
 *   - `req.body` {Object} Insurance update data.
 *     - `name` {string} Insurance name.
 *     - `amc_code` {string} AMC code.
 *     - `street_number` {string|number} Street number.
 *     - `street_name` {string} Street name.
 *     - `postal_code` {string} Postal code.
 *     - `city` {string} City.
 *     - `prefix` {string} Phone prefix.
 *     - `phone_number` {string} Phone number.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 200: Updated insurance organism object
 *   - 400: Validation errors, missing data, or not found
 *   - 500: Internal server error
 *
 * @sideEffects
 * - Updates an existing insurance organism record in the database.
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Insurance } from '../../../models/associations.js';
import updatedInsuranceSchema from '../../joi_validations/update_validations/updatedInsuranceSchema.js';

export default async function updateInsuranceOrganismAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const insurance_id = getValidId(req.params.insurance_id, 'Insurance ID');

      if (!req.body) {
        return res.status(400).json({
          message:
            'Request body is missing. Please provide the necessary data.',
        });
      } else {
        const { error } = updatedInsuranceSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        } else {
          const {
            name,
            amc_code,
            street_number,
            street_name,
            postal_code,
            city,
            prefix,
            phone_number,
          } = req.body;

          const foundInsurance = await Insurance.findByPk(insurance_id);

          if (!foundInsurance) {
            return res.status(400).json({ message: 'Insurance not found' });
          } else {
            const sentInsurance = {
              admin_id,
              name: name || foundInsurance.name,
              amc_code: amc_code || foundInsurance.amc_code,
              street_number: street_number || foundInsurance.street_number,
              street_name: street_name || foundInsurance.street_name,
              postal_code: postal_code || foundInsurance.postal_code,
              city: city || foundInsurance.city,
              phone_number: phone_number || foundInsurance.phone_number,
              prefix: prefix || foundInsurance.prefix,
              full_phone_number: `${prefix && phone_number ? prefix + phone_number : foundInsurance.full_phone_number}`,
            };

            const response = await foundInsurance.update(sentInsurance);

            if (response) {
              return res
                .status(200)
                .json({ message: 'Insurance organism updated', response });
            } else {
              return res
                .status(500)
                .json({ message: 'Error updating insurance organism.' });
            }
          }
        }
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error updating insurance.' });
    }
  }
}
