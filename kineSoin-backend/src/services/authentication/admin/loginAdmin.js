/**
 * @description Authenticates an admin using validated credentials and issues a JWT
 *              for session‑based access to protected admin functionality.
 *
 * Rationale:
 * - Ensures only verified administrators can access privileged routes,
 *   preserving system security and preventing unauthorized access.
 * - Keeps the controller focused on validation, credential checks, and predictable
 *   response formatting while delegating hashing and persistence to dedicated utilities.
 *
 * Notes:
 * - Validates email and password format before performing any database lookup.
 * - Uses secure password verification and short‑lived JWTs to enforce safe authentication.
 * - Stores the admin ID in the session to support subsequent authenticated requests.
 * - Returns clear, consistent HTTP status codes for invalid credentials and unexpected errors.
 */

import jsonwebtoken from 'jsonwebtoken';
import verifyPassword from '../../../authentication/verifyPassword.js';
import { Admin } from '../../../models/index.js';
import loggedInAdminSchema from '../../../validations/joi/authentication/loggedInEntitySchema.js';

export default async function loginAdmin(req, res) {
  const { error } = loggedInAdminSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const { email, password } = req.body;

    const foundAdmin = await Admin.findOne({
      where: { email },
      attributes: ['id', 'name', 'password'],
    });

    if (!foundAdmin) {
      return res.status(401).json({
        message: `Invalid email or password.`,
      });
    }

    const isPasswordValid = verifyPassword(password, foundAdmin.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: `Invalid email or password.`,
      });
    }
    const jwtContent = { admin_id: foundAdmin.id };

    const token = jsonwebtoken.sign(jwtContent, process.env.TOKEN_KEY, {
      expiresIn: '3h',
      algorithm: 'HS256',
    });

    req.session.admin_id = foundAdmin.id;

    return res.status(200).json({
      message: 'Admin logged in successfully.',
      id: foundAdmin.id,
      name: foundAdmin.name,
      token,
    });
  } catch (error) {
    console.error('Error logging in:', error);

    return res.status(500).json({
      message: 'Error logging in',
    });
  }
}
