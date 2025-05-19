/**
 * @function loginPatient
 * @description
 * Handles the login process for a patient:
 *
 * 1. Validates the email and password from the request body using Joi schema.
 * 2. Retrieves the patient by email from the database.
 * 3. Uses a utility function `checkPatientStatus` to verify patient status (e.g. active or not).
 * 4. Compares the input password with the stored hashed password using Scrypt.
 * 5. If valid, creates a JWT token and returns patient data and token in response.
 *
 * @param {Object} req - Express request object. Requires `email` and `password` in `req.body`.
 * @param {Object} res - Express response object. Returns patient details and JWT on success.
 *
 * @returns {Object} 200 OK on successful login, or appropriate error messages for validation/authentication failures.
 */

import Joi from 'joi';
import jsonwebtoken from 'jsonwebtoken';
import { Scrypt } from '../../../authentification/Scrypt.js';
import { Patient } from '../../../models/index.js';
import { checkPatientStatus } from '../../checkPatientStatus.js';

export default async function loginPatient(req, res) {
  const loginPatientSchema = Joi.object({
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
    const { error } = loginPatientSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { email, password } = req.body;

    const foundPatient = await Patient.findOne({
      where: { email },
      attributes: ['id', 'name', 'surname', 'picture_url', 'password'],
    });

    checkPatientStatus(foundPatient);

    const isPasswordValid = Scrypt.compare(password, foundPatient.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message:
          'Unauthorized access. Please check your credentials and try again.',
      });
    }

    const jwtContent = { patient_id: foundPatient.id };

    const token = jsonwebtoken.sign(jwtContent, process.env.TOKEN_KEY, {
      expiresIn: '3h',
      algorithm: 'HS256',
    });

    res.status(200).json({
      message: 'Patient logged in successfully.',
      id: foundPatient.id,
      fullName: `${foundPatient.name} ${foundPatient.surname}`,
      picture_url: foundPatient.picture_url,
      token,
    });
  }
}
