/**
 * @description Computes a person’s age from a provided birth‑date string,
 *              validating the input and rejecting malformed or missing values.
 *
 * Rationale:
 * - Centralizes age calculation to ensure consistent validation and formatting
 *   across the application.
 * - Protects downstream logic by rejecting invalid or non‑date inputs early.
 *
 * Notes:
 * - Requires a valid ISO date string (YYYY‑MM‑DD).
 * - Throws when the input is missing, not a string, or cannot be parsed as a date.
 * - Computes age using a simple year‑based approximation suitable for profile
 *   metadata and non‑legal contexts.
 *
 * Returns:
 * - A whole‑number age in years.
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
