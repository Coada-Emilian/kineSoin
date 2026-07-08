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

import loginTherapistService from '../../../../../services/authentication/therapist/loginTherapist.js';
import { createAccessToken } from '../../../../../services/authentication/token/tokenService.js';
import loggedInTherapistSchema from '../../../../../validations/joi/authentication/loggedInEntitySchema.js';

export default async function loginTherapist(req, res) {
  const { error } = loggedInTherapistSchema.validate(req.body);

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }

  const therapist = await loginTherapistService(req.body);

  if (!therapist) {
    const err = new Error('Invalid email or password.');
    err.statusCode = 401;
    throw err;
  }

  const token = createAccessToken({
    therapist_id: therapist.id,
    id: therapist.id,
    role: 'THERAPIST',
  });

  return res.status(200).json({
    message: 'Therapist logged in successfully.',
    id: therapist.id,
    fullName: `${therapist.name} ${therapist.surname}`,
    picture_url: therapist.picture_url,
    token,
  });
}
