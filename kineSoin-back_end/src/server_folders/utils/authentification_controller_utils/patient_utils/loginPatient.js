/**
 * @function loginPatient
 * @description
 * Authenticates a patient and generates a JSON Web Token (JWT) for access
 * to protected patient resources.
 *
 * This controller:
 * - Ensures the request body is provided.
 * - Validates login credentials using Joi schema (`loggedInPatientSchema`).
 * - Retrieves the patient account using the provided email address.
 * - Verifies the patient's account status using `checkPatientStatus`.
 * - Compares the provided password against the stored hashed password using `Scrypt`.
 * - Generates a JWT containing the patient's ID.
 * - Returns authenticated patient information and the access token.
 *
 * Behavior:
 * - Authenticates patients using email and password credentials.
 * - Uses secure password verification through password hashing.
 * - Generates a JWT signed with the application's secret key.
 * - Provides a token valid for 3 hours.
 * - Returns only non-sensitive patient information in the response.
 *
 * Security considerations:
 * - Passwords are never returned to the client.
 * - Password verification is performed using secure hash comparison.
 * - JWTs are signed using the configured `TOKEN_KEY` environment variable.
 * - Invalid credentials always return the same error message to avoid
 *   exposing account existence information.
 *
 * Error handling:
 * - Returns 400 if the request body is missing.
 * - Returns 400 if validation fails.
 * - Returns 401 if the email is not associated with an existing patient.
 * - Returns 401 if the password is incorrect.
 * - May return errors thrown by `checkPatientStatus` if the patient's
 *   account status does not allow authentication.
 *
 * @param {Object} req - Express request object.
 *   - `req.body` {Object} Login credentials.
 *     - `email` {string} Patient email address.
 *     - `password` {string} Patient password.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 200: Authenticated patient information and JWT token.
 *   - 400: Validation or missing data errors.
 *   - 401: Authentication failure.
 *
 * Response payload:
 * - `message` {string} Success message.
 * - `id` {number} Patient ID.
 * - `fullName` {string} Patient full name.
 * - `picture_url` {string|null} Patient profile picture URL.
 * - `token` {string} JWT access token.
 *
 * @sideEffects
 * - Generates and signs a JWT token.
 * - Performs authentication checks against the database.
 */

import jsonwebtoken from 'jsonwebtoken';
import { Scrypt } from '../../../authentification/Scrypt.js';
import { Patient } from '../../../models/index.js';
import { checkPatientStatus } from '../../checkPatientStatus.js';
import loggedInPatientSchema from '../../joi_validations/authentification_validations/loggedInEntitySchema.js';

export default async function loginPatient(req, res) {
  if (!req.body) {
    return res.status(400).json({
      message: 'Request body is missing. Please provide the necessary data.',
    });
  } else {
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
        message:
          'Unauthorized access. Please check your credentials and try again.',
      });
    } else {
      checkPatientStatus(foundPatient);

      const isPasswordValid = Scrypt.compare(password, foundPatient.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          message:
            'Unauthorized access. Please check your credentials and try again.',
        });
      }

      const jwtContent = { patient_id: foundPatient.id };

      const token = jsonwebtoken.sign(jwtContent, process.env.TOKEN_KEY, {
        expiresIn: '3h',
        algorithm: 'HS256',
      });

      res.status(200).json({
        message: 'Patient logged in successfully.',
        id: foundPatient.id,
        fullName: `${foundPatient.name} ${foundPatient.surname}`,
        picture_url: foundPatient.picture_url,
        token,
      });
    }
  }
}
