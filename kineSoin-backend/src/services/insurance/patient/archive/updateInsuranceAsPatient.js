/**
 * @description Updates the authenticated patient’s insurance contract by applying
 *              validated changes while preserving existing values for omitted fields.
 *
 * Rationale:
 * - Ensures patients can safely maintain accurate insurance information, supporting
 *   reimbursement workflows and medical‑billing consistency.
 * - Keeps the controller focused on validation, partial‑update merging, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the patient ID and all update fields before performing any write.
 * - Enforces chronological integrity by requiring `end_date` to be later than `start_date`.
 * - Merges incoming fields with existing contract data to avoid unintended overwrites.
 * - Returns clear, consistent HTTP status codes for invalid input, missing records,
 *   successful updates, and unexpected server errors.
 */

import Joi from 'joi';
import { Patient_Insurance } from '../../../../models/index.js';

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
