/**
 * @description Validates the payload for updating an existing insurance‑provider
 *              record, enforcing strict typing and ensuring at least one field is
 *              supplied before applying changes.
 *
 * Rationale:
 * - Centralizes update‑validation logic to keep controllers clean and ensure
 *   predictable, uniform error handling.
 * - Protects database integrity by rejecting empty updates or malformed fields.
 *
 * Notes:
 * - All fields are optional, but the schema requires at least one to be present.
 * - Supports updates to administrative metadata, address information, contact
 *   details, and coding fields.
 * - Ensures insurance‑provider records remain consistent, standardized, and safely
 *   modifiable.
 */

import Joi from 'joi';

const updatedInsuranceSchema = Joi.object({
  admin_id: Joi.number().optional(),
  name: Joi.string().optional(),
  amc_code: Joi.string().optional(),
  street_number: Joi.string().optional(),
  street_name: Joi.string().optional(),
  postal_code: Joi.string().optional(),
  city: Joi.string().optional(),
  phone_number: Joi.string().optional(),
  prefix: Joi.string().optional(),
  full_phone_number: Joi.string().optional(),
}).min(1);

export default updatedInsuranceSchema;
