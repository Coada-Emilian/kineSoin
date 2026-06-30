/**
 * @description Validates the payload for updating an existing therapist record,
 *              enforcing strict typing, length constraints, and ensuring at least
 *              one field is provided before applying changes.
 *
 * Rationale:
 * - Centralizes update‑validation logic to keep controllers clean and ensure
 *   predictable, uniform error handling.
 * - Protects database integrity by rejecting empty updates or malformed fields.
 *
 * Notes:
 * - All fields are optional, but the schema requires at least one to be present.
 * - Supports updates to identity, contact information, professional metadata,
 *   licensing, and account status.
 * - Allows empty strings for certain fields to support intentional clearing.
 * - Ensures therapist records remain consistent, standardized, and safely modifiable.
 */

import Joi from 'joi';

const updatedTherapistSchema = Joi.object({
  status: Joi.string().valid('active', 'inactive').optional(),
  id: Joi.number().integer().optional(),
  name: Joi.string().max(50).allow('').optional(),
  surname: Joi.string().max(50).allow('').optional(),
  email: Joi.string().email().max(100).allow('').optional(),
  password: Joi.string().max(100).allow('').optional(),
  diploma: Joi.string().max(50).allow('').optional(),
  experience: Joi.string().max(50).allow('').optional(),
  specialty: Joi.string().max(50).allow('').optional(),
  phone_number: Joi.string().max(15).allow('').optional(),
  description: Joi.string().allow('').optional(),
  licence_code: Joi.string().max(9).allow('').optional(),
  prefix: Joi.string().max(10).allow('').optional(),
}).min(1);

export default updatedTherapistSchema;
