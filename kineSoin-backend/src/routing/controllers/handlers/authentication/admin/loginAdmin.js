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

import jsonwebtoken from 'jsonwebtoken';
import loginAdminService from '../../../../../services/authentication/admin/loginAdmin.js';
import loggedInAdminSchema from '../../../../../validations/joi/authentication/loggedInEntitySchema.js';

export default async function loginAdmin(req, res) {
  try {
    const { error } = loggedInAdminSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const admin = await loginAdminService(req.body);

    if (!admin) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    const token = jsonwebtoken.sign(
      { admin_id: admin.id },
      process.env.TOKEN_KEY,
      {
        expiresIn: '3h',
        algorithm: 'HS256',
      }
    );

    req.session.admin_id = admin.id;

    return res.status(200).json({
      message: 'Admin logged in successfully.',
      id: admin.id,
      name: admin.name,
      token,
    });
  } catch (error) {
    console.error('Error logging in:', error);

    return res.status(500).json({
      message: 'Error logging in.',
    });
  }
}
