/**
 * @function handleTherapistStatusChangeAsAdmin
 *
 * Sends a PUT request to update a therapist's status as an admin.
 *
 * @param {number} id - The ID of the therapist whose status will be changed.
 * @param {string} status - The new status value to set for the therapist.
 *
 * @returns {Promise<boolean>}
 * - Returns `true` if the status update was successful (HTTP 200).
 * - Returns `false` if the update failed, request completed with error, or if input validation fails.
 *
 * @example
 * const success = await handleTherapistStatusChangeAsAdmin(123, 'active');
 */

import axios from '../../../../axios.ts';

export const handleTherapistStatusChangeAsAdmin = async (
  id: number,
  status: string
) => {
  if (id && status) {
    try {
      const response = await axios.put(`/admin/therapists/${id}/changeStatus`, {
        status,
      });
      if (response.status === 200) {
        console.log('Therapist status updated successfully');

        return true;
      } else {
        console.error('Failed to update therapist status', response.data);
        return false;
      }
    } catch (error) {
      console.error('Error updating therapist status:', error);
      return false;
    }
  } else {
    console.error('Therapist ID or status is missing or invalid');
    return false;
  }
};
