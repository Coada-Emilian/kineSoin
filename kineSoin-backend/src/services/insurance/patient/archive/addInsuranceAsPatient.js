/**
 * @description Adds an insurance contract to the authenticated patient’s profile,
 *              using validated contract details and enforcing correct date ordering.
 *
 * Rationale:
 * - Ensures patients can securely attach insurance coverage to their account,
 *   supporting reimbursement workflows and medical‑billing accuracy.
 * - Keeps the controller focused on validation, structured payload creation, and
 *   predictable response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the patient ID and all contract fields before performing any write.
 * - Enforces chronological integrity by requiring `end_date` to be later than `start_date`.
 * - Returns clear, consistent HTTP status codes for invalid input, failed creation,
 *   and unexpected server errors (including duplicate contract constraints).
 */

import Joi from 'joi';
import { Patient_Insurance } from '../../../../models/index.js';

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
