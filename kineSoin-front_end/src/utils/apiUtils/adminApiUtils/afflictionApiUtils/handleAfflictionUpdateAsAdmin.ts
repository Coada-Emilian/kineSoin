/**
 * @function handleAfflictionUpdateAsAdmin
 *
 * Sends an HTTP PUT request to update an affliction's profile as an admin.
 *
 * @param {number} id - The ID of the affliction to update.
 * @param {FormData} formData - The form data containing updated affliction details.
 *
 * @returns {Promise<boolean>} Returns `true` if the update is successful (HTTP 200), otherwise `false`.
 *
 * @throws Will log an error if the HTTP request fails or the server responds with a non-200 status.
 *
 * @example
 * const formData = new FormData();
 * formData.append('name', 'New Affliction Name');
 * // ... add other fields
 * const success = await handleAfflictionUpdateAsAdmin(1, formData);
 */

import axios from '../../../../axios.ts';

// Function to handle affliction update as admin
export const handleAfflictionUpdateAsAdmin = async (
  id: number,
  formData: FormData
) => {
  try {
    const response = await axios.put(`/admin/afflictions/${id}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      console.log('Affliction updated successfully');
      return true;
    } else {
      console.error('Failed to update affliction', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error updating affliction:', error);
    return false;
  }
};
