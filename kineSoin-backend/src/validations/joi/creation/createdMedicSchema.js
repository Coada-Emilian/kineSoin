/**
 * @description Validates the payload required to create a new medic record,
 *              enforcing strict typing and presence rules to maintain consistent
 *              professional‑directory data across the application.
 *
 * Rationale:
 * - Centralizes medic‑creation validation to keep controllers clean and ensure
 *   predictable, uniform error handling.
 * - Protects database integrity by rejecting incomplete, malformed, or improperly
 *   typed fields before persistence.
 *
 * Notes:
 * - Requires core identity fields (`name`, `surname`, `email`) and all professional
 *   metadata (`licence_code`, `prefix`, contact and address fields).
 * - Ensures medic records remain standardized, fully populated, and safe to store.
 */

import Joi from 'joi';

const createdMedicSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  street_number: Joi.string().optional(),
  street_name: Joi.string().required(),
  postal_code: Joi.string().required(),
  city: Joi.string().required(),
  phone_number: Joi.string().required(),
  licence_code: Joi.string().required(),
  prefix: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

export default createdMedicSchema;
