/**
 * @function addInsuranceAsPatient
 * @description
 * Allows a patient to add an insurance to their profile by submitting required contract details.
 *
 * Steps:
 * 1. Parses and validates `patient_id` from authenticated context.
 * 2. Validates the request body using Joi schema:
 *    - Ensures all necessary fields are present: `insurance_id`, `adherent_code`, `contract_number`, `start_date`, `end_date`.
 *    - Verifies `end_date` is after `start_date`.
 * 3. Constructs the patient-insurance object and inserts it into the database.
 *
 * Responses:
 * - 200: Returns success message and added insurance entry.
 * - 400: If validation fails or patient/insurance is not found.
 * - 500: If an error occurs (e.g., constraint violation like duplicate `contract_number`).
 *
 * @param {Object} req - Express request object; expects `patient_id` and insurance details in body.
 * @param {Object} res - Express response object for sending results or error messages.
 */

import Joi from 'joi';
import { Patient_Insurance } from '../../../models/index.js';

export default async function addInsuranceAsPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient not found' });
  } else {
    try {
      const addedInsuranceSchema = Joi.object({
        insurance_id: Joi.number().required(),
        adherent_code: Joi.string().required(),
        contract_number: Joi.string().required(),
        start_date: Joi.date().iso().required(),
        end_date: Joi.date().iso().required().greater(Joi.ref('start_date')),
      });

      if (!req.body) {
        return res.status(400).json({
          message:
            'Request body is missing. Please provide the necessary data.',
        });
      } else {
        const { error } = addedInsuranceSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        }
      }

      const {
        insurance_id,
        adherent_code,
        contract_number,
        start_date,
        end_date,
      } = req.body;

      const sentInsurance = {
        patient_id,
        insurance_id,
        adherent_code,
        contract_number,
        start_date,
        end_date,
      };

      const addedInsurance = await Patient_Insurance.create(sentInsurance);

      if (!addedInsurance) {
        return res.status(400).json({ message: 'The insurance was not added' });
      } else {
        return res
          .status(200)
          .json({ message: 'The insurance was added', addedInsurance });
      }
    } catch (error) {
      return res.status(500).json({
        message:
          'Error adding insurance. Contract number or adherent code already exists.',
      });
    }
  }
}
