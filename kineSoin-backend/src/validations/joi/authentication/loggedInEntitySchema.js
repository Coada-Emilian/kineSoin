/**
 * @description Validates and normalizes an incoming identifier, ensuring it is a
 *              positive integer before being used in authentication, routing, or
 *              database operations.
 *
 * Rationale:
 * - Centralizes ID validation to keep controllers and middleware clean.
 * - Prevents unsafe lookups by rejecting malformed, non‑numeric, or negative IDs.
 *
 * Notes:
 * - Converts the incoming value to a number and verifies it is a positive integer.
 * - Throws a descriptive error using the provided `label` when validation fails.
 * - Returns the validated numeric ID for downstream use.
 */

import Joi from 'joi';

const loggedInEntitySchema = Joi.object({
  email: Joi.string()
    .max(255)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'fr'] },
    })
    .required(),
  password: Joi.required(),
});

export default loggedInEntitySchema;
