/**
 * @description Handles patient self‑registration, validating input, enforcing
 *              age and uniqueness rules, hashing credentials, and attaching an
 *              optional profile picture before creating the account.
 *
 * Rationale:
 * - Ensures new patient accounts meet strict data, age, and security requirements,
 *   preventing invalid registrations and duplicate identities.
 * - Keeps the controller focused on validation, normalization, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates all registration fields through a Joi schema.
 * - Enforces age limits (12–120) to maintain medical and legal compliance.
 * - Prevents duplicate accounts by checking email uniqueness.
 * - Verifies password confirmation and hashes credentials using Scrypt.
 * - Supports optional profile‑picture upload and stores both ID and URL.
 * - Creates new patients with a default `pending` status for later approval.
 * - Returns consistent HTTP status codes for validation errors, conflicts,
 *   successful creation, and unexpected server issues.
 */

import { Scrypt } from '../../authentication/Scrypt.js';
import { Patient } from '../../models/index.js';
import computeAge from '../../utils/computeAge.js';
import registeredPatientSchema from '../../validations/joi/registration/registeredPatientSchema.js';

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
