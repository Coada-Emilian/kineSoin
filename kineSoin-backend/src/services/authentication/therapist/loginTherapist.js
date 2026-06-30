/**
 * @description Authenticates a therapist using validated credentials and issues a JWT
 *              for secure access to protected therapist functionality.
 *
 * Rationale:
 * - Ensures only verified therapists can access clinical workflows and patient data,
 *   preserving security and preventing unauthorized access.
 * - Keeps the controller focused on validation, credential checks, and predictable
 *   response formatting while delegating hashing and persistence to dedicated utilities.
 *
 * Notes:
 * - Validates email and password format before performing any database lookup.
 * - Enforces therapist‑status checks to prevent login for inactive accounts.
 * - Uses secure password verification and short‑lived JWTs to maintain safe authentication.
 * - Returns clear, consistent HTTP status codes for invalid credentials and unexpected errors.
 */

import jsonwebtoken from 'jsonwebtoken';
import verifyPassword from '../../../authentication/verifyPassword.js';
import { Therapist } from '../../../models/index.js';
import loggedInTherapistSchema from '../../../validations/joi/authentication/loggedInEntitySchema.js';

export default async function loginTherapist(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: 'Request body is missing. Please provide the necessary data.',
      });
    }
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
        message: `Invalid email or password.`,
      });
    }

    if (foundTherapist.status === 'inactive') {
      return res.status(401).json({
        message: `Your account is inactive. Please contact the administrator.`,
      });
    }

    const isPasswordValid = verifyPassword(password, foundTherapist.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: `Invalid email or password.`,
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
  } catch (error) {
    console.error('Error logging in:', error);

    return res.status(500).json({
      message: 'Error logging in:',
    });
  }
}
