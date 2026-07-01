/**
 * @description Authenticates an admin using email and password credentials.
 *
 * Responsibilities:
 * - Retrieves the admin account associated with the provided email.
 * - Verifies the provided password against the stored password hash.
 * - Returns the authenticated admin when credentials are valid.
 *
 * Notes:
 * - This service contains authentication logic only.
 * - It does not depend on Express request/response objects.
 */

import verifyPassword from '../../../authentication/verifyPassword.js';
import { Admin } from '../../../models/index.js';

export default async function loginAdminService({ email, password }) {
  const admin = await Admin.findOne({
    where: { email },
    attributes: ['id', 'name', 'password'],
  });

  if (!admin) {
    return null;
  }

  const isPasswordValid = verifyPassword(password, admin.password);

  if (!isPasswordValid) {
    return null;
  }

  return admin;
}
