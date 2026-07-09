/**
 * @description Handles admin authentication requests and establishes an authenticated session.
 *
 * Responsibilities:
 * - Validates login credentials format.
 * - Delegates credential verification to the authentication service.
 * - Generates an authentication token.
 * - Stores the authenticated admin identity in the session.
 * - Returns authenticated admin information.
 *
 * Notes:
 * - This handler manages HTTP, session, and token concerns.
 * - Credential verification logic is handled by the service layer.
 */

import loginAdminService from '../../../../../services/authentication/admin/loginAdmin.js';
import createAuthSession from '../../../../../services/authentication/token/createAuthSession.js';
import loggedInAdminSchema from '../../../../../validations/joi/authentication/loggedInEntitySchema.js';

export default async function loginAdmin(req, res) {
  const { error } = loggedInAdminSchema.validate(req.body);

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }
  const admin = await loginAdminService(req.body);

  if (!admin) {
    const err = new Error('Invalid email or password.');
    err.statusCode = 401;
    throw err;
  }

  const { accessToken, refreshToken } = await createAuthSession({
    id: admin.id,
    role: 'ADMIN',
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: 'Admin logged in successfully.',
    token: accessToken,
    user: {
      id: admin.id,
      role: 'ADMIN',
    },
  });
}
