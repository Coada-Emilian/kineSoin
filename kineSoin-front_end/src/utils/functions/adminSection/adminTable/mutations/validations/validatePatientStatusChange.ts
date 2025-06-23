/**
 * @function validatePatientStatusChange
 *
 * Validates the input fields for changing a patient's status.
 *
 * @param {number} id - The ID of the patient.
 * @param {string} status - The new status to assign to the patient.
 *
 * @throws Will throw an error if required fields are missing or if the status is invalid.
 *
 * @returns {boolean} Returns true if validation passes.
 *
 * @example
 * validatePatientStatusChange(123, 'active'); // returns true
 */

export function validatePatientStatusChange(id: number, status: string) {
  if (!id || !status) {
    throw new Error('Missing required fields');
  } else if (
    status !== 'active' &&
    status !== 'inactive' &&
    status !== 'pending' &&
    status !== 'banned'
  ) {
    throw new Error('Invalid status');
  }
  return true;
}
