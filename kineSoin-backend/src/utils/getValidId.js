/**
 * @description Validates and normalizes an incoming ID value, ensuring it is a
 *              positive integer before allowing it to be used in database or
 *              authorization logic.
 *
 * Rationale:
 * - Centralizes ID validation to keep controllers clean and ensure consistent,
 *   predictable error handling across the application.
 * - Prevents unsafe lookups by rejecting non‑numeric, negative, or malformed IDs.
 *
 * Notes:
 * - Converts the incoming value to a number and verifies it is a positive integer.
 * - Throws a descriptive error using the provided `label` when validation fails.
 * - Returns the validated numeric ID for downstream use.
 */

export function getValidId(value, label = 'ID') {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error(`${label} must be a positive integer`);
  }

  return id;
}
