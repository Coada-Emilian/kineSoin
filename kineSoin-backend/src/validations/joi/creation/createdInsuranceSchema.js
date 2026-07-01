/**
 * @description Validates the payload required to create a new insurance provider
 *              record, enforcing strict presence and type requirements to maintain
 *              consistent administrative data across the application.
 *
 * Rationale:
 * - Centralizes insurance‑creation validation to keep controllers clean and ensure
 *   predictable, uniform error handling.
 * - Protects database integrity by rejecting incomplete or malformed inputs before
 *   persistence.
 *
 * Notes:
 * - Requires all core fields (`name`, `amc_code`, address fields, contact fields)
 *   to be present and formatted as strings.
 * - Ensures insurance‑provider records remain standardized and fully populated.
 */

import Joi from 'joi';

const createdInsuranceSchema = Joi.object({
  name: Joi.string().required(),
  amc_code: Joi.string().required(),
  street_number: Joi.string().required(),
  street_name: Joi.string().required(),
  postal_code: Joi.string().required(),
  city: Joi.string().required(),
  phone_number: Joi.string().required(),
  prefix: Joi.string().required(),
});

export default createdInsuranceSchema;
