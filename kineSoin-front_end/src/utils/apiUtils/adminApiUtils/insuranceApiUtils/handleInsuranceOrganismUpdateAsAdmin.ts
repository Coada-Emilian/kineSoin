/**
 * @function handleInsuranceOrganismUpdateAsAdmin
 *
 * Sends a PUT request to update an insurance organism's details as an admin.
 *
 * @param {number} id - The ID of the insurance organism to update.
 * @param {FormData} formData - The form data containing the updated insurance organism details.
 *
 * @returns {Promise<boolean|null>}
 * - Returns `true` if the update was successful (HTTP 200).
 * - Returns `false` if the update failed but the request completed.
 * - Returns `null` if an error occurred during the request.
 *
 * @example
 * const formData = new FormData();
 * formData.append('name', 'New Insurance Name');
 * // ... add other fields
 * const success = await handleInsuranceOrganismUpdateAsAdmin(1, formData);
 */

import axios from '../../../../axios.ts';

// Function to handle insurance organism update as admin
export const handleInsuranceOrganismUpdateAsAdmin = async (
  id: number,
  formData: FormData
) => {
  try {
    const response = await axios.put(
      `/admin/insuranceOrganisms/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 200) {
      console.log('Insurance organism updated successfully');
      return true;
    } else {
      console.error('Failed to update insurance organism', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error fetching insurance organism:', error);
    return null;
  }
};
