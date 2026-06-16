/**
 * @function handleTherapistUpdateAsAdmin
 *
 * Sends a PUT request to update a therapist's profile as an admin.
 *
 * @param {number} id - The ID of the therapist to update.
 * @param {FormData} formData - The form data containing the updated therapist details.
 *
 * @returns {Promise<boolean>} Returns `true` if the update is successful, otherwise `false`.
 *
 * @throws Will log errors if the request fails.
 *
 * @example
 * const formData = new FormData();
 * formData.append('name', 'John');
 * formData.append('surname', 'Doe');
 * // ... add all required fields
 * const success = await handleTherapistUpdateAsAdmin(1, formData);
 * if (success) {
 *   console.log('Update succeeded');
 * } else {
 *   console.log('Update failed');
 * }
 */

import axios from '../../../../axios.ts';

// Function to handle therapist update as admin
export const handleTherapistUpdateAsAdmin = async (
  id: number,
  formData: FormData
) => {
  try {
    const response = await axios.put(`/admin/therapists/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200) {
      console.log('Therapist profile updated successfully');
      return true;
    } else {
      console.error('Failed to update therapist profile', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error updating therapist profile:', error);
    return false;
  }
};
