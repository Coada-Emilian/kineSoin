/**
 * @description Authenticates a therapist using email and password credentials.
 *
 * Responsibilities:
 * - Retrieves the therapist account associated with the provided email.
 * - Verifies the provided password against the stored password hash.
 * - Returns the authenticated therapist when credentials are valid.
 *
 * Notes:
 * - This service contains authentication logic only.
 * - It does not depend on Express request/response objects.
 */

import verifyPassword from '../../../authentication/verifyPassword.js';
import { Therapist } from '../../../models/index.js';

export default async function loginTherapistService({ email, password }) {
  const therapist = await Therapist.findOne({
    where: { email },
    attributes: ['id', 'name', 'surname', 'status', 'picture_url', 'password'],
  });

  if (!therapist) {
    return null;
  }

  const isPasswordValid = verifyPassword(password, therapist.password);

  if (!isPasswordValid) {
    return null;
  }

  return therapist;
}
