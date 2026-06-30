import jsonwebtoken from 'jsonwebtoken';
import loginAdminService from '../../../../services/authentication/loginAdmin.js';
import loggedInAdminSchema from '../../../../validations/joi/authentication/loggedInEntitySchema.js';

export default async function loginAdmin(req, res) {
  const { error } = loggedInAdminSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  try {
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
