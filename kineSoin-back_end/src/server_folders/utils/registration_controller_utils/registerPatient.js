/**
 * @function registerPatient
 * @description
 * Registers a new patient account in the system.
 *
 * This controller:
 * - Ensures the request body is provided.
 * - Validates incoming registration data using Joi schema (`registeredPatientSchema`).
 * - Calculates the patient's age from the provided birth date.
 * - Verifies that the patient meets the minimum and maximum age requirements.
 * - Checks whether the provided email address is already registered.
 * - Verifies that the password and repeated password match.
 * - Processes the uploaded profile picture if provided.
 * - Hashes the patient's password using `Scrypt`.
 * - Creates a new patient record in the database.
 * - Returns a sanitized patient object upon successful registration.
 *
 * Behavior:
 * - Restricts registration to patients between 12 and 120 years old.
 * - Prevents duplicate accounts based on email address.
 * - Stores passwords securely using hashing.
 * - Associates an uploaded profile picture with the patient account.
 * - Creates newly registered patients with a default status of `pending`.
 *
 * Error handling:
 * - Returns 400 if the request body is missing.
 * - Returns 400 if validation fails.
 * - Returns 400 if the patient is younger than 12 years old.
 * - Returns 400 if the birth date results in an age greater than 120 years.
 * - Returns 400 if the passwords do not match.
 * - Returns 400 if patient creation fails.
 * - Returns 409 if the email address is already registered.
 *
 * @param {Object} req - Express request object.
 *   - `req.body` {Object} Registration data.
 *     - `email` {string} Patient email address.
 *     - `password` {string} Patient password.
 *     - `repeated_password` {string} Password confirmation.
 *     - `therapist_id` {number} Associated therapist ID.
 *     - `name` {string} Patient first name.
 *     - `birth_name` {string} Patient birth name.
 *     - `surname` {string} Patient surname.
 *     - `birth_date` {string} Patient birth date.
 *     - `gender` {string} Patient gender.
 *     - `street_number` {string|number} Street number.
 *     - `street_name` {string} Street name.
 *     - `postal_code` {string} Postal code.
 *     - `city` {string} City.
 *     - `prefix` {string} Phone prefix.
 *     - `phone_number` {string} Phone number.
 *   - `req.file` {Object} Uploaded profile picture.
 *     - `filename` {string} Stored file identifier.
 *     - `path` {string} File URL/path.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 201: Successfully registered patient information.
 *   - 400: Validation, age, password, or creation errors.
 *   - 409: Email already registered.
 *
 * @sideEffects
 * - Creates a new patient record in the database.
 * - Stores a hashed password.
 * - Associates an uploaded profile picture with the patient.
 */

import { Scrypt } from '../../authentification/Scrypt.js';
import { Patient } from '../../models/index.js';
import computeAge from '../computeAge.js';
import registeredPatientSchema from '../joi_validations/registration_validations/registeredPatientSchema.js';

export default async function registerPatient(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: 'Request body is missing. Please provide the necessary data.',
      });
    } else {
      const { error } = registeredPatientSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const {
        email,
        password,
        repeated_password,
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

      const age = computeAge(birth_date);

      if (age < 12) {
        return res.status(400).json({
          message: 'Patients must be at least 12 years old to register.',
        });
      } else if (age > 120) {
        return res.status(400).json({
          message: 'Please provide a valid birth date.',
        });
      }

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

      if (req.file) {
        const picture_id = req.file.filename;
        const picture_url = req.file.path;

        const hashedPassword = Scrypt.hash(password);

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
          full_phone_number: `${prefix}${phone_number}}`,
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
  } catch (error) {
    console.error('Error registering patient:', error);

    return res.status(500).json({
      message: 'Error registering patient:',
      error: error.message,
    });
  }
}
