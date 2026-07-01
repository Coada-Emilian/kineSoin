/**
 * @description Validates whether a patient’s account is eligible for authentication
 *              by checking the existence of the record and enforcing restricted
 *              status rules.
 *
 * Rationale:
 * - Protects the authentication flow by preventing login attempts from banned,
 *   pending, or inactive accounts.
 * - Centralizes patient‑status validation to keep controllers clean and ensure
 *   consistent error messaging across the application.
 *
 * Notes:
 * - Throws when the patient record does not exist.
 * - Rejects access for `banned`, `pending`, or `inactive` accounts with clear,
 *   user‑friendly messages.
 * - Returns `true` only when the patient is active and allowed to proceed.
 *
 * Status rules:
 * - `banned`: Account suspended; access permanently blocked.
 * - `pending`: Account awaiting approval; access temporarily blocked.
 * - `inactive`: Account deactivated; requires reactivation before login.
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
