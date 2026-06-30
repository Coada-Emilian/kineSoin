/**
 * @function handleMedicUpdateAsAdmin
 *
 * Sends a PUT request to update a medic's profile as an admin.
 *
 * @param {number} id - The ID of the medic to update.
 * @param {FormData} formData - The form data containing the updated medic details.
 *
 * @returns {Promise<boolean>} Returns `true` if the update is successful, otherwise `false`.
 *
 * @throws Will log errors to the console if the update fails.
 *
 * @example
 * const formData = new FormData();
 * formData.append('name', 'Jane');
 * // ... append other fields
 * const success = await handleMedicUpdateAsAdmin(1, formData);
 * if(success) {
 *   console.log('Update successful');
 * }
 */

import axios from '../../../../axios.ts';

// Function to handle medic update as admin
export const handleMedicUpdateAsAdmin = async (
  id: number,
  formData: FormData
) => {
  try {
    const response = await axios.put(`/admin/medics/${id}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      console.log('Medic profile updated successfully');
      return true;
    } else {
      console.error('Failed to update medic profile', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error updating medic profile:', error);
    return false;
  }
};
