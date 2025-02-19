/**
 * @description Defines the authentication controller, which contains the methods for registering and logging in patients, therapists, and admins.
 *
 * This module:
 * - Imports necessary dependencies including environment variables, Joi for input validation, jsonwebtoken for generating tokens, and utility functions.
 * - Imports the Patient, Therapist, and Admin models.
 * - Imports the checkPatientStatus utility function.
 *
 * The authentication controller contains the following methods:
 *
 * - registerPatient:
 *   - Validates the input data for registering a new patient using Joi.
 *   - Checks if the request body is provided, and returns an error if not.
 *   - Computes the age of the patient from the birth date and ensures the patient is at least 12 years old.
 *   - Checks if the email is already registered, and returns an error if it is.
 *   - Compares the password and repeated password, and returns an error if they don't match.
 *   - Handles uploading the patient's photo if provided.
 *   - Hashes the patient's password using Scrypt.
 *   - Creates a new patient record in the database.
 *   - Returns a success response with the patient's details if registration is successful, otherwise returns an error.
 *
 * - loginPatient:
 *   - Validates the input data for logging in a patient using Joi.
 *   - Checks if the request body is provided, and returns an error if not.
 *   - Finds the patient by email in the database.
 *   - Checks the patient's status using checkPatientStatus.
 *   - Compares the provided password with the hashed password in the database.
 *   - Generates a JSON Web Token (JWT) for the patient if login is successful.
 *   - Returns a success response with the patient's details and token if login is successful, otherwise returns an error.
 *
 * - loginTherapist:
 *   - Validates the input data for logging in a therapist using Joi.
 *   - Checks if the request body is provided, and returns an error if not.
 *   - Finds the therapist by email in the database.
 *   - Checks if the therapist's account is inactive, and returns an error if it is.
 *   - Compares the provided password with the hashed password in the database.
 *   - Generates a JSON Web Token (JWT) for the therapist if login is successful.
 *   - Returns a success response with the therapist's details and token if login is successful, otherwise returns an error.
 *
 * - loginAdmin:
 *   - Validates the input data for logging in an admin using Joi.
 *   - Finds the admin by email in the database.
 *   - Compares the provided password with the hashed password in the database.
 *   - Generates a JSON Web Token (JWT) for the admin if login is successful.
 *   - Stores the admin's ID in the session.
 *   - Returns a success response with the admin's details and token if login is successful, otherwise returns an error.
 *
 * - checkPatientPassword:
 *   - Parses the patient ID from the request.
 *   - Checks if the patient ID is a valid number.
 *   - Finds the patient by ID in the database.
 *   - Compares the provided password with the hashed password in the database.
 *   - Returns a success response if the password is correct, otherwise returns an error.
 *
 * Ensure that the necessary dependencies and modules are installed and properly configured before using this controller.
 */

import 'dotenv/config';
import Joi from 'joi';
import jsonwebtoken from 'jsonwebtoken';
import computeAge from '../../utils/computeAge.js';
import { Scrypt } from '../../authentification/Scrypt.js';
import { Patient, Therapist, Admin } from '../../models/index.js';
import { checkPatientStatus } from '../../utils/checkPatientStatus.js';
import { checkIsValidNumber } from '../../utils/checkIsValidNumber.js';

const authentificationController = {
  // Function to register a new patient
  registerPatient: async (req, res) => {
    const registerSchema = Joi.object({
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

      const fullPhoneNumber = req.body.prefix + req.body.phone_number;

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
  },

  // Function to login patient
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

  // Function to login therapist
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
  },

  // Function to login admin
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
  },

  // Function to check patient password
  checkPatientPassword: async (req, res) => {
    const patient_id = parseInt(req.patient_id, 10);
    checkIsValidNumber(patient_id);

    if (!patient_id) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      try {
        const foundPatient = await Patient.findByPk(patient_id);

        if (!foundPatient) {
          return res.status(404).json({
            message:
              'Patient not found. Please check the patient ID and try again.',
          });
        }

        const { password } = req.body;

        const isPasswordValid = Scrypt.compare(password, foundPatient.password);

        if (!isPasswordValid) {
          return res.status(401).json({
            message: 'Invalid password. Please try again.',
          });
        } else {
          return res.status(200).json({
            message: 'Password is correct.',
          });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  },
};

export default authentificationController;
