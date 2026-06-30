/**
 * @description Retrieves all available insurance organisms for the authenticated
 *              patient, ensuring the patient is active before exposing insurance data.
 *
 * Rationale:
 * - Ensures only verified and active patients can access insurance‑organism listings,
 *   preserving system integrity and preventing unauthorized reads.
 * - Keeps the controller focused on validation, status checks, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the patient ID and confirms the patient exists before performing any read.
 * - Enforces patient‑status rules to block access for inactive or restricted accounts.
 * - Returns clear, consistent HTTP status codes for invalid IDs, missing records,
 *   empty results, and unexpected server errors.
 */

import { Insurance, Patient } from '../../../../models/index.js';
import { checkPatientStatus } from '../../checkPatientStatus.js';

export default async function getInsurancesAsPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

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
