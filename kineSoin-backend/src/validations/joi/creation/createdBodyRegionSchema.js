/**
 * @description Validates the payload required to create a new body‑region record,
 *              enforcing strict typing and length constraints to maintain consistent
 *              medical‑taxonomy data across the application.
 *
 * Rationale:
 * - Centralizes validation for body‑region creation to keep controllers clean and
 *   ensure predictable error handling.
 * - Protects database integrity by rejecting malformed or incomplete inputs before
 *   persistence.
 *
 * Notes:
 * - Requires a non‑empty `name` field with a maximum length of 50 characters.
 * - Ensures the body‑region taxonomy remains standardized and well‑structured.
 */

import Joi from 'joi';

const createdBodyRegionSchema = Joi.object({
  name: Joi.string().max(50).required(),
});

export default createdBodyRegionSchema;
