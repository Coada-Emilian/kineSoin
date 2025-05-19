/**
 * @function registerPatient
 * @description
 * Handles patient registration:
 *
 * 1. Validates input data using Joi schema (name, surname, birth date, email, password, etc.).
 * 2. Computes patient's age to ensure it falls within acceptable range (12–120 years).
 * 3. Checks for existing email to prevent duplicate registration.
 * 4. Verifies password and repeated password match.
 * 5. Optionally handles profile picture if a file is provided.
 * 6. Hashes the password using Scrypt.
 * 7. Constructs and stores the new patient record with a status of `'pending'`.
 * 8. Responds with patient details on success, or appropriate error messages otherwise.
 *
 * @param {Object} req - Express request object. Requires patient registration data in `req.body`.
 * @param {Object} res - Express response object. Returns success message and patient summary or error status.
 *
 * @returns {Object} 201 Created on successful registration, or 400/409 error for validation failures.
 */

import Joi from 'joi';
import { Scrypt } from '../../../authentification/Scrypt.js';
import { Patient } from '../../../models/index.js';
import computeAge from '../../computeAge.js';

export default async function registerPatient(req, res) {
  const registerPatientSchema = Joi.object({
    therapist_id: Joi.number().optional(),
    name: Joi.string().max(50).required(),
    birth_name: Joi.string().max(50),
    surname: Joi.string().max(50).required(),
    birth_date: Joi.date().required(),
    gender: Joi.string().max(10).required(),
    street_number: Joi.string().max(10),
    street_name: Joi.string().max(50).required(),
    postal_code: Joi.string().max(10).required(),
    city: Joi.string().max(100).required(),
    prefix: Joi.string().max(10).required(),
    phone_number: Joi.string().max(15).required(),
    full_phone_number: Joi.string().max(25).optional(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(12).max(255).required(),
    repeated_password: Joi.string().min(12).max(255).required(),
  });

  if (!req.body) {
    return res.status(400).json({
      message: 'Request body is missing. Please provide the necessary data.',
    });
  } else {
    const { error } = registerPatientSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const age = computeAge(req.body.birth_date);

    if (age < 12) {
      return res.status(400).json({
        message: 'Patients must be at least 12 years old to register.',
      });
    } else if (age > 120) {
      return res.status(400).json({
        message: 'Please provide a valid birth date.',
      });
    }

    const { email, password, repeated_password } = req.body;

    const existingPatient = await Patient.findOne({ where: { email } });

    if (existingPatient) {
      return res.status(409).json({
        message:
          'This email address is already registered. Please use a different email or log in.',
      });
    } else if (password !== repeated_password) {
      return res.status(400).json({
        message: 'Passwords do not match. Please try again.',
      });
    }

    let picture_id = null;
    let picture_url = null;

    if (req.file) {
      picture_id = req.file.filename;
      picture_url = req.file.path;
    }

    const hashedPassword = Scrypt.hash(password);

    const {
      therapist_id,
      name,
      birth_name,
      birth_date,
      surname,
      gender,
      street_number,
      street_name,
      postal_code,
      city,
      prefix,
      phone_number,
    } = req.body;

    const fullPhoneNumber = prefix + phone_number;

    const newPatient = await Patient.create({
      therapist_id,
      name,
      birth_name,
      surname,
      gender,
      birth_date,
      street_number,
      street_name,
      postal_code,
      city,
      prefix,
      phone_number,
      full_phone_number: fullPhoneNumber,
      email,
      password: hashedPassword,
      status: 'pending',
      picture_url,
      picture_id,
    });

    if (!newPatient) {
      return res.status(400).json({
        message: 'Patient registration failed. Please try again.',
      });
    } else {
      return res.status(201).json({
        message: 'Patient registered successfully.',
        patient: {
          id: newPatient.id,
          fullName: `${newPatient.name} ${newPatient.surname}`,
          email: newPatient.email,
          picture_url: newPatient.picture_url,
        },
      });
    }
  }
}
