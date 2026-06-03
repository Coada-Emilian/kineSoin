/**
 * @function createInsuranceOrganismAsAdmin
 * @description
 * Creates a new insurance organism entry in the system by an admin.
 *
 * Steps:
 * 1. Validates the `admin_id` extracted from the request (should be an integer).
 * 2. Validates the request body against the `createdInsuranceSchema` using Joi.
 * 3. Constructs a full insurance object including a composed `full_phone_number`.
 * 4. Attempts to persist the insurance organism using Sequelize's `Insurance.create`.
 *
 * Responses:
 * - 200: Insurance organism successfully created.
 * - 400: Missing or invalid admin ID, request body, or schema validation error.
 * - 500: Internal server error while creating the organism.
 *
 * @param {Object} req - Express request object containing `admin_id` and body fields.
 * @param {Object} res - Express response object used to return appropriate HTTP responses.
 */

import Joi from 'joi';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Insurance } from '../../../models/associations.js';

export default async function createInsuranceOrganismAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      if (!req.body) {
        return res.status(400).json({
          message:
            'Request body is missing. Please provide the necessary data.',
        });
      } else {
        const createdInsuranceSchema = Joi.object({
          name: Joi.string().required(),
          amc_code: Joi.string().required(),
          street_number: Joi.string().required(),
          street_name: Joi.string().required(),
          postal_code: Joi.string().required(),
          city: Joi.string().required(),
          phone_number: Joi.string().required(),
          prefix: Joi.string().required(),
        });
        const { error } = createdInsuranceSchema.validate(req.body);
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
            phone_number,
            prefix,
          } = req.body;
          const full_phone_number = prefix + phone_number;
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
            full_phone_number,
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
        }
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error creating insurance.' });
    }
  }
}
