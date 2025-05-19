/**
 * @function getInsurancesAsPatient
 * @description
 * Allows a patient to retrieve the list of all available insurance organisms (IDs and names).
 *
 * Steps:
 * 1. Parses and validates `patient_id` from the authenticated request context.
 * 2. Finds the patient in the database to ensure they exist.
 * 3. Uses `checkPatientStatus` to ensure the patient's account is valid/active.
 * 4. If valid, fetches all insurance records with minimal details (`id`, `name`).
 *
 * Responses:
 * - 200: Returns a list of insurances.
 * - 400: If patient ID is invalid or no insurance is found.
 * - 404: If patient does not exist.
 * - 500: If a server/database error occurs during retrieval.
 *
 * @param {Object} req - Express request object; expects `patient_id` from authenticated context.
 * @param {Object} res - Express response object for sending data or error messages.
 */

import { Insurance, Patient } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';
import { checkPatientStatus } from '../../checkPatientStatus.js';

export default async function getInsurancesAsPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  checkIsValidNumber(patient_id);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient not found' });
  } else {
    try {
      const foundPatient = await Patient.findByPk(patient_id);

      if (!foundPatient) {
        return res.status(404).json({
          message:
            'Patient not found. Please check the patient ID and try again.',
        });
      } else {
        const response = checkPatientStatus(foundPatient);

        if (response) {
          const foundInsurances = await Insurance.findAll({
            attributes: ['id', 'name'],
          });

          if (!foundInsurances) {
            return res.status(400).json({ message: 'No insurances found' });
          } else {
            return res.status(200).json(foundInsurances);
          }
        }
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching insurances.' });
    }
  }
}
