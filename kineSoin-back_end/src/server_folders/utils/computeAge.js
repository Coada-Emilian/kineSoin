// Purpose: compute the age of a person based on their birth date.

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
