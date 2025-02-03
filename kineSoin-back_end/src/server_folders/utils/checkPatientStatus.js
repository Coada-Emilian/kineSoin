/**
 * @description Checks if the patient status is banned, pending, or inactive.
 *
 * This function:
 * - Accepts a patient object (foundPatient) as its parameter.
 * - Checks if the patient object is not found.
 *   - If the patient object is not found, throws an error with a message indicating that the account is not found.
 *
 * - Defines a statusMessages object with the following properties:
 *   - banned: A message indicating that the account is banned.
 *   - pending: A message indicating that the account is pending.
 *   - inactive: A message indicating that the account is inactive.
 *
 * - Checks if the patient's status matches any of the properties in the statusMessages object.
 *   - If the patient's status matches, throws an error with the corresponding message from the statusMessages object.
 *
 * - Returns true if the patient is found and their status is not banned, pending, or inactive.
 *
 * @param {Object} foundPatient - The patient object to be checked.
 * @returns {boolean} - Returns true if the patient is found and their status is valid, otherwise throws an error.
 *
 * Example usage:
 * checkPatientStatus({ status: 'banned' }); // throws Error: "Invalid email or password. Your account is currently banned. Please contact support."
 * checkPatientStatus({ status: 'active' }); // returns true
 * checkPatientStatus(null); // throws Error: "Invalid email or password. Your account is currently not found. Please try again."
 */
export function checkPatientStatus(foundPatient) {
  // If the patient is not found, throw an error.
  if (!foundPatient) {
    throw new Error(
      'Invalid email or password. Your account is currently not found. Please try again.'
    );
  }

  // If the patient status is banned, pending, or inactive, throw an error.
  const statusMessages = {
    banned: 'Your account is currently banned. Please contact support.',
    pending: 'Your account is currently pending. Please check back later.',
    inactive:
      'Your account is currently inactive. Please reactivate your account.',
  };

  if (statusMessages[foundPatient.status]) {
    throw new Error(
      `Invalid email or password. ${statusMessages[foundPatient.status]}`
    );
  }

  return true;
}
