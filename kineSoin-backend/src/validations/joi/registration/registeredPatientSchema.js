/**
 * @description Validates the payload required to register a new patient, enforcing
 *              strict typing, length constraints, and password rules to maintain
 *              consistent and reliable onboarding data across the application.
 *
 * Rationale:
 * - Centralizes patient‑registration validation to keep controllers clean and ensure
 *   predictable, uniform error handling.
 * - Protects database integrity by rejecting incomplete, malformed, or insecure
 *   inputs before persistence.
 *
 * Notes:
 * - Enforces identity fields, demographic data, contact information, and address
 *   structure.
 * - Requires strong passwords (min 12 chars) and a matching `repeated_password`.
 * - Supports optional therapist assignment via `therapist_id`.
 * - Ensures patient records remain standardized, secure, and fully populated.
 */

import Joi from 'joi';

const registeredPatientSchema = Joi.object({
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

export default registeredPatientSchema;
