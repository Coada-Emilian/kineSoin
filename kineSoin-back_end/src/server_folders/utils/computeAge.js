export default function computeAge(birthDate) {
  if (!birthDate || typeof birthDate !== 'string') {
    throw new Error('Error: No input provided. Please supply a date string.');
  }

  const parsedBirthDate = new Date(birthDate);
  if (isNaN(parsedBirthDate)) {
    throw new Error(
      'Error: Invalid date format. Please use the ISO format YYYY-MM-DD.'
    );
  }

  const now = new Date().getTime();

  return Math.floor(
    (now - parsedBirthDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
  );
}
