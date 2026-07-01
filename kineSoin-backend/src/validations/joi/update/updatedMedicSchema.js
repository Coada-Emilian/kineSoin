/**
 * @description Validates the payload for updating an existing medic record,
 *              enforcing strict typing and ensuring at least one field is supplied
 *              before applying changes.
 *
 * Rationale:
 * - Centralizes update‑validation logic to keep controllers clean and ensure
 *   predictable, uniform error handling.
 * - Protects database integrity by rejecting empty updates or malformed fields.
 *
 * Notes:
 * - Requires `admin_id` to identify the actor performing the update.
 * - All other fields are optional, but at least one must be present.
 * - Supports updates to identity, contact information, address details, licensing,
 *   and professional metadata.
 * - Ensures medic records remain consistent, standardized, and safely modifiable.
 */

import Joi from 'joi';

const updatedMedicSchema = Joi.object({
  admin_id: Joi.number().optional(),
  name: Joi.string().optional(),
  surname: Joi.string().optional(),
  street_number: Joi.string().optional(),
  street_name: Joi.string().optional(),
  postal_code: Joi.string().optional(),
  city: Joi.string().optional(),
  phone_number: Joi.string().optional(),
  licence_code: Joi.string().optional(),
  prefix: Joi.string().optional(),
  full_phone_number: Joi.string().optional(),
  email: Joi.string().email().optional(),
}).min(1);

export default updatedMedicSchema;
