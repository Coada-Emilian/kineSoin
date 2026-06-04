/**
 * @function loginAdmin
 * @description
 * Authenticates an admin based on email and password credentials.
 *
 * Workflow:
 * 1. Validates the request body using Joi to ensure proper email and password formats.
 * 2. Checks if an admin exists in the database by email.
 * 3. Verifies the password using Scrypt (secure hash comparison).
 * 4. If valid, generates a JSON Web Token (JWT) and stores the admin ID in the session.
 * 5. Responds with the admin’s basic details and authentication token.
 *
 * @param {Object} req - Express request object, expecting `email` and `password` in the body.
 * @param {Object} res - Express response object used to send status and JSON data.
 *
 * @returns {Object} 200 OK with token and admin info on success, or appropriate error status on failure.
 */

import jsonwebtoken from 'jsonwebtoken';
import validatePassword from '../../../middlewares/validatePassword.js';
import { Admin } from '../../../models/index.js';
import loginAdminSchema from '../../joi_validations/authentification_validations/loginAdminSchema.js';

export default async function loginAdmin(req, res) {
  const { error } = loginAdminSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  } else {
    const { email, password } = req.body;

    const foundAdmin = await Admin.findOne({
      where: { email },
      attributes: ['id', 'name', 'password'],
    });

    if (!foundAdmin) {
      return res.status(401).json({
        message: `Invalid email or password. Please try again.`,
      });
    }

    const isPasswordValid = validatePassword(password, foundAdmin.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message:
          'Unauthorized access. Please check your credentials and try again.',
      });
    } else {
      const jwtContent = { admin_id: foundAdmin.id };

      const token = jsonwebtoken.sign(jwtContent, process.env.TOKEN_KEY, {
        expiresIn: '3h',
        algorithm: 'HS256',
      });

      req.session.admin_id = foundAdmin.id;

      res.status(200).json({
        message: 'Admin logged in successfully.',
        id: foundAdmin.id,
        name: foundAdmin.name,
        token,
      });
    }
  }
}
