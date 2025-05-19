/**
 * @function loginTherapist
 * @description
 * Handles therapist login:
 *
 * 1. Validates input credentials using Joi schema (email and password).
 * 2. Searches for a therapist by email in the database.
 * 3. Verifies the therapist exists and is not inactive.
 * 4. Compares provided password with the stored hashed password using Scrypt.
 * 5. If valid, signs a JWT containing the therapist ID and returns it along with user details.
 * 6. Returns appropriate error messages if validation or authentication fails.
 *
 * @param {Object} req - Express request object containing login credentials in `req.body`.
 * @param {Object} res - Express response object. Returns JWT, therapist details, or an error message.
 *
 * @returns {Object} 200 OK with token and user info, or 400/401 on error.
 */

import Joi from 'joi';
import jsonwebtoken from 'jsonwebtoken';
import { Scrypt } from '../../../authentification/Scrypt.js';
import { Therapist } from '../../../models/index.js';

export default async function loginTherapist(req, res) {
  const loginTherapistSchema = Joi.object({
    email: Joi.string()
      .max(255)
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
      .required(),
    password: Joi.required(),
  });

  if (!req.body) {
    return res.status(400).json({
      message: 'Request body is missing. Please provide the necessary data.',
    });
  } else {
    const { error } = loginTherapistSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { email, password } = req.body;

    const foundTherapist = await Therapist.findOne({
      where: { email },
      attributes: ['id', 'name', 'surname', 'status', 'picture_url'],
    });

    if (!foundTherapist) {
      return res.status(401).json({
        message: `Invalid email or password. Please try again.`,
      });
    }

    if (foundTherapist.status === 'inactive') {
      return res.status(401).json({
        message: `Your account is inactive. Please contact the administrator.`,
      });
    }

    const isPasswordValid = Scrypt.compare(password, foundTherapist.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message:
          'Unauthorized access. Please check your credentials and try again.',
      });
    }

    const jwtContent = { therapist_id: foundTherapist.id };

    const token = jsonwebtoken.sign(jwtContent, process.env.TOKEN_KEY, {
      expiresIn: '3h',
      algorithm: 'HS256',
    });

    res.status(200).json({
      message: 'Therapist logged in successfully.',
      id: foundTherapist.id,
      fullName: `${foundTherapist.name} ${foundTherapist.surname}`,
      picture_url: foundTherapist.picture_url,
      token,
    });
  }
}
