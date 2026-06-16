/**
 * @function validateTherapistStatusChange
 *
 * Validates the input parameters for changing a therapist's status.
 *
 * @param {number} id - The ID of the therapist whose status will be changed.
 * @param {string} status - The new status value, must be either 'active' or 'inactive'.
 *
 * @throws {Error} Throws an error if required fields are missing or the status is invalid.
 *
 * @returns {boolean} Returns true if validation passes.
 *
 * @example
 * validateTherapistStatusChange(123, 'active'); // returns true
 */

export function validateTherapistStatusChange(id: number, status: string) {
  if (!id || !status) {
    throw new Error('Missing required fields');
  } else if (status !== 'active' && status !== 'inactive') {
    throw new Error('Invalid status');
  }
  return true;
}
