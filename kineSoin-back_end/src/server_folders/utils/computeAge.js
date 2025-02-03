/**
 * @description Computes the age of a person based on their birth date.
 *
 * This function:
 * - Accepts a birth date as its parameter (birthDate).
 * - Checks if the input is provided and if it's a string.
 *   - If no input is provided or if the input is not a string, throws an error with a message indicating the issue.
 *
 * - Parses the birth date string to create a Date object.
 *   - If the input is not a valid date, throws an error with a message indicating the issue and suggesting the correct date format (ISO format YYYY-MM-DD).
 *
 * - Computes the age of the person by subtracting the birth date from the current date.
 *   - The age is calculated in milliseconds and then converted to years using the formula:
 *     - (current time in milliseconds - birth date time in milliseconds) / (1000 * 60 * 60 * 24 * 365)
 *   - Uses the Math.floor function to round down the computed age to the nearest integer.
 *
 * @param {string} birthDate - The birth date of the person in ISO format (YYYY-MM-DD).
 * @returns {number} - Returns the computed age of the person in years.
 *
 * Example usage:
 * computeAge('2000-01-01'); // returns the age based on the birth date '2000-01-01'
 * computeAge('invalid-date'); // throws Error: "Error: Invalid date format. Please use the ISO format YYYY-MM-DD."
 * computeAge(); // throws Error: "Error: No input provided. Please supply a date string."
 */

export default function computeAge(birthDate) {
  // If no input is provided or if it's a string throw an error.
  if (!birthDate || typeof birthDate !== 'string') {
    throw new Error('Error: No input provided. Please supply a date string.');
  }

  // If the input is not a valid date, throw an error.
  const parsedBirthDate = new Date(birthDate);
  if (isNaN(parsedBirthDate)) {
    throw new Error(
      'Error: Invalid date format. Please use the ISO format YYYY-MM-DD.'
    );
  }

  // Compute the age of the person.
  const now = new Date().getTime();

  return Math.floor(
    (now - parsedBirthDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
  );
}
