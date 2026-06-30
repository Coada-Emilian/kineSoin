import verifyPassword from '../../authentication/verifyPassword.js';
import { Admin } from '../../models/index.js';

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
