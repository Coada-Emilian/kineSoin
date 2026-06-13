/**
 * @function updateInsuranceAsPatient
 * @description
 * Allows a patient to update their associated insurance information.
 *
 * Steps:
 * 1. Parses and validates `patient_id` from the authenticated request context.
 * 2. Validates the request body using Joi:
 *    - Accepts optional `insurance_id`, `adherent_code`, `contract_number`.
 *    - Requires valid ISO `start_date` and `end_date`, with `end_date` > `start_date`.
 * 3. Checks if the patient has an existing insurance record in `Patient_Insurance`.
 * 4. Merges provided values with existing ones to update only changed fields.
 * 5. Updates the record in the database.
 *
 * Responses:
 * - 200: Insurance updated successfully.
 * - 400: If validation fails, body is missing, insurance not found, or update fails.
 * - 500: On server or database error during the update.
 *
 * @param {Object} req - Express request object; expects `patient_id` in auth context and body with update fields.
 * @param {Object} res - Express response object for sending data or error messages.
 */

import Joi from 'joi';
import { Patient_Insurance } from '../../../models/index.js';

export default async function updateInsuranceAsPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient not found' });
  } else {
    try {
      const updatedInsuranceSchema = Joi.object({
        insurance_id: Joi.number().optional(),
        adherent_code: Joi.string().optional(),
        contract_number: Joi.string().optional(),
        start_date: Joi.date().iso().required(),
        end_date: Joi.date().iso().required().greater(Joi.ref('start_date')),
      }).min(1);

      if (!req.body) {
        return res.status(400).json({
          message:
            'Request body is missing. Please provide the necessary data.',
        });
      } else {
        const { error } = updatedInsuranceSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        }
      }

      const foundInsurance = await Patient_Insurance.findOne({
        where: { patient_id },
      });

      if (!foundInsurance) {
        return res.status(400).json({ message: 'Insurance not found' });
      } else {
        const updatedInsurance = {
          patient_id,
          insurance_id: req.body.insurance_id || foundInsurance.insurance_id,
          adherent_code: req.body.adherent_code || foundInsurance.adherent_code,
          contract_number:
            req.body.contract_number || foundInsurance.contract_number,
          start_date: req.body.start_date,
          end_date: req.body.end_date,
        };

        const response = await foundInsurance.update(updatedInsurance);

        if (response) {
          return res
            .status(200)
            .json({ message: 'The insurance was updated', response });
        } else {
          return res
            .status(400)
            .json({ message: 'The insurance was not updated', response });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error updating insurance.' });
    }
  }
}
