/**
 * @description Validates a patient’s password by comparing the provided value
 *              against the securely stored hash for the authenticated patient.
 *
 * Rationale:
 * - Ensures patients can safely verify their identity before performing sensitive
 *   account operations, preserving security and preventing unauthorized access.
 * - Keeps the controller focused on validation, lookup, and predictable response
 *   formatting while delegating hashing logic to dedicated utilities.
 *
 * Notes:
 * - Validates the patient ID before performing any credential check.
 * - Uses secure Scrypt comparison to avoid exposing raw password data.
 * - Returns clear, consistent HTTP status codes for invalid IDs, missing records,
 *   incorrect passwords, and unexpected server errors.
 */

import { Scrypt } from '../../../../authentication/Scrypt.js';
import { Patient } from '../../../../models/index.js';

export default async function checkPatientPassword(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient not found' });
  } else {
    try {
      const foundPatient = await Patient.findByPk(patient_id, {
        attributes: ['id', 'password'],
      });

      if (!foundPatient) {
        return res.status(404).json({
          message:
            'Patient not found. Please check the patient ID and try again.',
        });
      }

      const { password } = req.body;

      const isPasswordValid = Scrypt.compare(password, foundPatient.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          message: 'Invalid password. Please try again.',
        });
      } else {
        return res.status(200).json({
          message: 'Password is correct.',
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
