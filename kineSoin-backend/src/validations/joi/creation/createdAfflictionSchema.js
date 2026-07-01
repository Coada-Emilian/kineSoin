/**
 * @description Validates the payload required to create a new affliction record,
 *              enforcing strict typing and field‑length constraints to ensure
 *              consistent medical‑data formatting across the application.
 *
 * Rationale:
 * - Centralizes affliction‑creation validation to keep controllers clean and ensure
 *   predictable error handling.
 * - Protects database integrity by rejecting malformed, incomplete, or improperly
 *   typed fields before persistence.
 *
 * Notes:
 * - Requires a valid `body_region_id` and enforces integer typing.
 * - Ensures core medical fields (`name`, `description`, `insurance_code`) meet
 *   length and presence requirements.
 * - Validates `is_operated` as a strict boolean.
 */

import Joi from 'joi';

const createdAfflictionSchema = Joi.object({
  body_region_id: Joi.number().integer().required(),
  name: Joi.string().max(50).required(),
  description: Joi.string().required(),
  insurance_code: Joi.string().max(255).required(),
  is_operated: Joi.boolean().required(),
});

export default createdAfflictionSchema;
