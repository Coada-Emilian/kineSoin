/**
 * @description Checks if the provided value is a valid number.
 *
 * This function:
 * - Accepts a value (id) as its parameter.
 * - Uses the isNaN function to check if the value is not a valid number.
 *   - Returns false if the value is not a valid number.
 *   - Returns true if the value is a valid number.
 *
 * @param {any} id - The value to be checked.
 * @returns {boolean} - Returns true if the value is a valid number, otherwise returns false.
 *
 * Example usage:
 * checkIsValidNumber(123); // returns true
 * checkIsValidNumber('abc'); // returns false
 * checkIsValidNumber('123'); // returns true
 */

export function checkIsValidNumber(value) {
  const isInvalid =
    typeof value !== 'number' || Number.isNaN(value) || value <= 0;

  if (isInvalid) {
    throw new Error('Invalid ID: must be a positive number');
  }
}
