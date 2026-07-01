/**
 * @description Handles therapist authentication requests and returns authentication credentials.
 *
 * Responsibilities:
 * - Validates login request data.
 * - Delegates credential verification to the authentication service.
 * - Generates an authentication token for the authenticated therapist.
 * - Formats and returns therapist information.
 *
 * Notes:
 * - This handler manages HTTP and token-related concerns.
 * - Credential verification logic is handled by the service layer.
 */

import jsonwebtoken from 'jsonwebtoken';
import loginTherapistService from '../../../../../services/authentication/therapist/loginTherapist.js';
import loggedInTherapistSchema from '../../../../../validations/joi/authentication/loggedInEntitySchema.js';

export default async function loginTherapist(req, res) {
  try {
    const { error } = loggedInTherapistSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const therapist = await loginTherapistService(req.body);

    if (!therapist) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    const token = jsonwebtoken.sign(
      { therapist_id: therapist.id },
      process.env.TOKEN_KEY,
      {
        expiresIn: '3h',
        algorithm: 'HS256',
      }
    );

    return res.status(200).json({
      message: 'Therapist logged in successfully.',
      id: therapist.id,
      fullName: `${therapist.name} ${therapist.surname}`,
      picture_url: therapist.picture_url,
      token,
    });
  } catch (error) {
    console.error('Error logging in:', error);

    return res.status(500).json({
      message: 'Error logging in.',
    });
  }
}
