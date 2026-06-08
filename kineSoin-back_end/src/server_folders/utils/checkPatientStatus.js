/**
 * @function checkPatientStatus
 * @description
 * Validates whether a patient's account status allows authentication and
 * access to the application.
 *
 * This utility:
 * - Verifies that a patient record exists.
 * - Checks the patient's account status.
 * - Throws descriptive errors when the account is not eligible for login.
 * - Returns `true` when the account is active and authorized.
 *
 * Behavior:
 * - Rejects authentication attempts for non-existent accounts.
 * - Prevents access for patients whose accounts are:
 *   - `banned`
 *   - `pending`
 *   - `inactive`
 * - Allows authentication to continue when no restricted status is detected.
 *
 * Status validation:
 * - `banned`: Account has been suspended and access is denied.
 * - `pending`: Account is awaiting approval and cannot access the system.
 * - `inactive`: Account has been deactivated and must be reactivated.
 *
 * Error handling:
 * - Throws an error if the patient record does not exist.
 * - Throws an error if the patient's status is banned.
 * - Throws an error if the patient's status is pending.
 * - Throws an error if the patient's status is inactive.
 *
 * @param {Object|null} foundPatient - Patient record retrieved from the database.
 *   - `status` {string} Current patient account status.
 *
 * @returns {boolean}
 * - Returns `true` when the patient account is valid and allowed to proceed.
 *
 * @throws {Error}
 * - If no patient record is provided.
 * - If the patient's status prevents authentication.
 *
 * @sideEffects
 * - None.
 */

export function checkPatientStatus(foundPatient) {
  if (!foundPatient) {
    throw new Error(
      'Invalid email or password. Your account is currently not found. Please try again.'
    );
  }

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
