/**
 * @function loginTherapist
 * @description
 * Authenticates a therapist and generates a JSON Web Token (JWT) for access
 * to protected therapist resources.
 *
 * This controller:
 * - Ensures the request body is provided.
 * - Validates login credentials using Joi schema (`loggedInTherapistSchema`).
 * - Retrieves the therapist account using the provided email address.
 * - Verifies that the therapist account exists.
 * - Checks whether the therapist account is active.
 * - Compares the provided password against the stored hashed password using `Scrypt`.
 * - Generates a JWT containing the therapist's ID.
 * - Returns authenticated therapist information and the access token.
 *
 * Behavior:
 * - Authenticates therapists using email and password credentials.
 * - Restricts access for inactive therapist accounts.
 * - Uses secure password verification through password hashing.
 * - Generates a JWT signed with the application's secret key.
 * - Provides a token valid for 3 hours.
 * - Returns only non-sensitive therapist information in the response.
 *
 * Security considerations:
 * - Passwords are never returned to the client.
 * - Password verification is performed using secure hash comparison.
 * - JWTs are signed using the configured `TOKEN_KEY` environment variable.
 * - Authentication failures do not expose sensitive account information.
 *
 * Error handling:
 * - Returns 400 if the request body is missing.
 * - Returns 400 if validation fails.
 * - Returns 401 if the therapist account does not exist.
 * - Returns 401 if the therapist account is inactive.
 * - Returns 401 if the password is incorrect.
 *
 * @param {Object} req - Express request object.
 *   - `req.body` {Object} Login credentials.
 *     - `email` {string} Therapist email address.
 *     - `password` {string} Therapist password.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 200: Authenticated therapist information and JWT token.
 *   - 400: Validation or missing data errors.
 *   - 401: Authentication failure.
 *
 * Response payload:
 * - `message` {string} Success message.
 * - `id` {number} Therapist ID.
 * - `fullName` {string} Therapist full name.
 * - `picture_url` {string|null} Therapist profile picture URL.
 * - `token` {string} JWT access token.
 *
 * @sideEffects
 * - Generates and signs a JWT token.
 * - Performs authentication checks against the database.
 */

import jsonwebtoken from 'jsonwebtoken';
import { Scrypt } from '../../../authentification/Scrypt.js';
import { Therapist } from '../../../models/index.js';
import loggedInTherapistSchema from '../../joi_validations/authentification_validations/loggedInEntitySchema.js';

export default async function loginTherapist(req, res) {
  if (!req.body) {
    return res.status(400).json({
      message: 'Request body is missing. Please provide the necessary data.',
    });
  } else {
    const { error } = loggedInTherapistSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { email, password } = req.body;

    const foundTherapist = await Therapist.findOne({
      where: { email },
      attributes: [
        'id',
        'name',
        'surname',
        'status',
        'picture_url',
        'password',
      ],
    });

    if (!foundTherapist) {
      return res.status(401).json({
        message: `Invalid email or password. Please try again.`,
      });
    }

    if (foundTherapist.status === 'inactive') {
      return res.status(401).json({
        message: `Your account is inactive. Please contact the administrator.`,
      });
    }

    const isPasswordValid = Scrypt.compare(password, foundTherapist.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message:
          'Unauthorized access. Please check your credentials and try again.',
      });
    }

    const jwtContent = { therapist_id: foundTherapist.id };

    const token = jsonwebtoken.sign(jwtContent, process.env.TOKEN_KEY, {
      expiresIn: '3h',
      algorithm: 'HS256',
    });

    res.status(200).json({
      message: 'Therapist logged in successfully.',
      id: foundTherapist.id,
      fullName: `${foundTherapist.name} ${foundTherapist.surname}`,
      picture_url: foundTherapist.picture_url,
      token,
    });
  }
}
