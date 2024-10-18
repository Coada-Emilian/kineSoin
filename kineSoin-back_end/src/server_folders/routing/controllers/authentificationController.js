// Purpose: Define the authentification controller, which contains the methods for registering and logging in patients and therapists.

import 'dotenv/config';
import Joi from 'joi';
import jsonwebtoken from 'jsonwebtoken';
import computeAge from '../../utils/computeAge.js';
import { Scrypt } from '../../authentification/Scrypt.js';
import { Patient, Therapist, Admin } from '../../models/index.js';
import { checkPatientStatus } from '../../utils/checkPatientStatus.js';

const authentificationController = {
  registerPatient: async (req, res) => {
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

    if (!req.body) {
      return res.status(400).json({
        message: 'Request body is missing. Please provide the necessary data.',
      });
    } else {
      const { error } = registerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const age = computeAge(req.body.birth_date);

      if (age < 12) {
        return res.status(400).json({
          message: 'Patients must be at least 12 years old to register.',
        });
      }

      const { email, password, repeated_password } = req.body;

      const existingPatient = await Patient.findOne({ where: { email } });
      if (existingPatient) {
        return res.status(409).json({
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
        phone_number,
      } = req.body;

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
  },

  loginPatient: async (req, res) => {
    const loginSchema = Joi.object({
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
      const { error } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const { email, password } = req.body;

      const foundPatient = await Patient.findOne({ where: { email } });

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
  },

  loginTherapist: async (req, res) => {
    const loginSchema = Joi.object({
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
      const { error } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const { email, password } = req.body;

      const foundTherapist = await Therapist.findOne({ where: { email } });

      if (!foundTherapist) {
        return res.status(401).json({
          message: `Invalid email or password. Please try again.`,
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
  },

  loginAdmin: async (req, res) => {
    const loginSchema = Joi.object({
      email: Joi.string()
        .max(255)
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .required(),
      password: Joi.required(),
    });

    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { email, password } = req.body;

    const foundAdmin = await Admin.findOne({ where: { email } });

    if (!foundAdmin) {
      return res.status(401).json({
        message: `Invalid email or password. Please try again.`,
      });
    }

    const isPasswordValid = Scrypt.compare(password, foundAdmin.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message:
          'Unauthorized access. Please check your credentials and try again.',
      });
    }

    const jwtContent = { admin_id: foundAdmin.id };

    const token = jsonwebtoken.sign(jwtContent, process.env.TOKEN_KEY, {
      expiresIn: '3h',
      algorithm: 'HS256',
    });

    res.status(200).json({
      message: 'Admin logged in successfully.',
      id: foundAdmin.id,
      name: foundAdmin.name,
      token,
    });
  },
};

export default authentificationController;
