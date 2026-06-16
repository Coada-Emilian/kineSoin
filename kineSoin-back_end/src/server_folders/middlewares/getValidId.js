/**
 * @function getValidId
 * @description
 * Validates and converts an input value into a strict positive integer ID.
 *
 * This utility function:
 * - Converts the input value to a number using `Number()`.
 * - Ensures the resulting value is a valid integer.
 * - Ensures the value is greater than zero.
 *
 * Validation rules:
 * - Must be a finite number.
 * - Must be an integer (no decimals allowed).
 * - Must be strictly greater than 0.
 *
 * Behavior:
 * - Returns a validated numeric ID if all checks pass.
 * - Throws an error immediately if validation fails.
 *
 * Error handling:
 * - Throws an Error if the value is not a valid positive integer.
 * - Error message includes the provided label for clearer debugging context.
 *
 * @param {any} value - The input value to validate and convert into an ID.
 * @param {string} [label='ID'] - Context label used in error messages for clarity.
 *
 * @returns {number} A validated positive integer ID.
 *
 * @throws {Error} When the value is not a valid positive integer.
 *
 * @sideEffects
 * - None. This function is pure and does not mutate external state.
 */

export function getValidId(value, label = 'ID') {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error(`${label} must be a positive integer`);
  }

  return id;
}
