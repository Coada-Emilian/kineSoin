/**
 * @description Validates the payload for creating a new message, ensuring the
 *              content meets minimum and maximum length requirements before being
 *              persisted or processed.
 *
 * Rationale:
 * - Centralizes message‑content validation to keep controllers clean and ensure
 *   consistent error handling across the application.
 * - Protects database integrity by rejecting empty or excessively long messages.
 *
 * Notes:
 * - Requires a non‑empty string between 1 and 255 characters.
 * - Ideal for chat, comment, or note‑creation flows where message size must be
 *   controlled.
 */

import Joi from 'joi';

const createdMessageSchema = Joi.string().min(1).max(255).required();

export default createdMessageSchema;
