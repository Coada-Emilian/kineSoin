/**
 * @function checkPatientPassword
 * @description
 * Validates whether the password provided in the request body matches the stored password for a specific patient.
 *
 * Workflow:
 * 1. Extracts and validates the `patient_id` from the request.
 * 2. Retrieves the patient from the database using the primary key.
 * 3. Compares the provided password with the stored hashed password using Scrypt.
 * 4. Sends a success response if the password matches, or an error if it doesn't or if the patient is not found.
 *
 * @param {Object} req - Express request object, expecting `req.patient_id` and `password` in the body.
 * @param {Object} res - Express response object used to send status and JSON data.
 *
 * @returns {Object} 200 OK if password is correct, otherwise appropriate error status and message.
 */

import { Scrypt } from '../../../authentification/Scrypt.js';
import { Patient } from '../../../models/index.js';

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
