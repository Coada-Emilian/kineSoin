/**
 * @description Validates the payload for updating an existing affliction record,
 *              enforcing strict typing and ensuring at least one field is provided
 *              before applying changes.
 *
 * Rationale:
 * - Centralizes update‑validation logic to keep controllers clean and ensure
 *   predictable, uniform error handling.
 * - Protects database integrity by rejecting empty updates or malformed fields.
 *
 * Notes:
 * - All fields are optional, but the schema requires at least one to be present.
 * - Supports updates to administrative metadata, body‑region linkage, medical
 *   descriptors, insurance coding, and operation status.
 * - Ensures affliction records remain consistent and safely modifiable.
 */

import Joi from 'joi';

const updatedAfflictionSchema = Joi.object({
  admin_id: Joi.number().integer().optional(),
  body_region_id: Joi.number().integer().optional(),
  name: Joi.string().max(50).optional(),
  description: Joi.string().optional(),
  insurance_code: Joi.string().max(255).optional(),
  is_operated: Joi.boolean().optional(),
}).min(1);

export default updatedAfflictionSchema;
