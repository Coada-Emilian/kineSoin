/**
 * @function updateInsuranceOrganismAsAdmin
 * @description
 * Updates an existing insurance organism's data in the database, accessible only by admins.
 *
 * Steps:
 * 1. Validates `admin_id` from the authenticated context.
 * 2. Parses and validates `insurance_id` from request parameters.
 * 3. Validates the request body using Joi to ensure at least one field is provided.
 * 4. Retrieves the insurance organism by primary key using Sequelize.
 * 5. Merges new values with existing ones and updates the database.
 *
 * Responses:
 * - 200: Returns a success message with the updated insurance data.
 * - 400: If `admin_id`, `insurance_id`, or request body is invalid or the insurance is not found.
 * - 500: If any unexpected error occurs during processing.
 *
 * @param {Object} req - Express request object; expects `admin_id`, `insurance_id` and update data in the body.
 * @param {Object} res - Express response object for sending results or errors.
 */

import Joi from 'joi';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Insurance } from '../../../models/associations.js';

export default async function updateInsuranceOrganismAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const insurance_id = parseInt(req.params.insurance_id, 10);

      checkIsValidNumber(insurance_id);

      if (!req.body) {
        return res.status(400).json({
          message:
            'Request body is missing. Please provide the necessary data.',
        });
      } else {
        const updatedInsuranceSchema = Joi.object({
          admin_id: Joi.number().optional(),
          name: Joi.string().optional(),
          amc_code: Joi.string().optional(),
          street_number: Joi.string().optional(),
          street_name: Joi.string().optional(),
          postal_code: Joi.string().optional(),
          city: Joi.string().optional(),
          phone_number: Joi.string().optional(),
          prefix: Joi.string().optional(),
          full_phone_number: Joi.string().optional(),
        }).min(1);

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

          const fullPhoneNumber = prefix + phone_number;

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
              full_phone_number:
                fullPhoneNumber || foundInsurance.full_phone_number,
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
