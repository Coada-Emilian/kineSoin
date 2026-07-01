/**
 * @description Authenticates a patient using validated credentials and issues a JWT
 *              for secure access to protected patient functionality.
 *
 * Rationale:
 * - Ensures only verified patients can access their medical data and appointment workflow,
 *   preserving privacy and preventing unauthorized access.
 * - Keeps the controller focused on validation, credential checks, and predictable
 *   response formatting while delegating hashing and persistence to dedicated utilities.
 *
 * Notes:
 * - Validates email and password format before performing any database lookup.
 * - Enforces patient‑status checks to prevent login for inactive or restricted accounts.
 * - Uses secure Scrypt comparison and short‑lived JWTs to maintain safe authentication.
 * - Returns clear, consistent HTTP status codes for invalid credentials and unexpected errors.
 */

import jsonwebtoken from 'jsonwebtoken';
import { Scrypt } from '../../../../authentication/Scrypt.js';
import { Patient } from '../../../../models/index.js';
import { checkPatientStatus } from '../../../../utils/checkPatientStatus.js';
import loggedInPatientSchema from '../../../joi_validations/authentication/loggedInEntitySchema.js';

export default async function loginPatient(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: 'Request body is missing. Please provide the necessary data.',
      });
    }
    const { error } = loggedInPatientSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { email, password } = req.body;

    const foundPatient = await Patient.findOne({
      where: { email },
      attributes: ['id', 'name', 'surname', 'picture_url', 'password'],
    });

    if (!foundPatient) {
      return res.status(401).json({
        message: `Invalid email or password.`,
      });
    }

    checkPatientStatus(foundPatient);

    const isPasswordValid = Scrypt.compare(password, foundPatient.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: `Invalid email or password.`,
      });
    }

    const jwtContent = { patient_id: foundPatient.id };

    const token = jsonwebtoken.sign(jwtContent, process.env.TOKEN_KEY, {
      expiresIn: '3h',
      algorithm: 'HS256',
    });

    return res.status(200).json({
      message: 'Patient logged in successfully.',
      id: foundPatient.id,
      fullName: `${foundPatient.name} ${foundPatient.surname}`,
      picture_url: foundPatient.picture_url,
      token,
    });
  } catch (error) {
    console.error('Error logging in:', error);

    return res.status(500).json({
      message: 'Error logging in',
    });
  }
}
