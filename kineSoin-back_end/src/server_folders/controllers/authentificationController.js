import 'dotenv/config';
import Joi from 'joi';
import jsonwebtoken from 'jsonwebtoken';

import computeAge from '../utils/computeAge.js';
import { Scrypt } from '../authentification/Scrypt.js';

import { Patient } from '../models/index.js';

const authentificationController = {
  registerPatient: async (req, res) => {
    const body = req.body;

    if (!body) {
      return res.status(400).json({
        message: 'Request body is missing. Please provide the necessary data.',
      });
    }

    const registerSchema = Joi.object({
      therapist_id: Joi.number().required(),
      name: Joi.string().max(50).required(),
      birth_name: Joi.string().max(50),
      surname: Joi.string().max(50).required(),
      birth_date: Joi.date().required(),
      gender: Joi.string().max(10).required(),
      street_number: Joi.string().max(10),
      street_name: Joi.string().max(50).required(),
      postal_code: Joi.string().max(10).required(),
      city: Joi.string().max(100).required(),
      phone_number: Joi.string().max(15).required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      password: Joi.string().min(12).max(255).required(),
      repeated_password: Joi.string().min(12).max(255).required(),
    });

    const { error } = registerSchema.validate(body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const age = computeAge(body.birth_date);

    if (age < 12) {
      return res.status(400).json({
        message: 'Patients must be at least 12 years old to register.',
      });
    }

    const { email, password, repeated_password } = body;

    const existingPatient = await Patient.findOne({ where: { email } });
    if (existingPatient) {
      return res.status(400).json({
        message:
          'This email address is already registered. Please use a different email or log in.',
      });
    }

    if (password !== repeated_password) {
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

    const hashedPassword = await Scrypt.hash(password);

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
      phone_number,
    } = body;

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
      phone_number,
      email,
      password: hashedPassword,
      repeated_password,
      picture_url,
      picture_id,
    });

    if (newPatient) {
      return res.status(201).json({
        message: 'Patient registered successfully.',
        patient: newPatient,
      });
    }
  },
};

export default authentificationController;
