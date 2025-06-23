/**
 * @function handleInsuranceOrganismCreationAsAdmin
 *
 * Sends a POST request to create a new insurance organism as an admin.
 *
 * @param {FormData} formData - The form data containing insurance organism details to be submitted.
 *
 * @returns {Promise<boolean>} Returns true if creation is successful (HTTP 200), otherwise false.
 *
 * @details
 * - Sends form data to the `/admin/insuranceOrganisms` endpoint with JSON content type.
 * - Logs success message on successful creation.
 * - Logs error messages and returns false on failure or exceptions.
 */

import axios from '../../../../axios.ts';

// Function to handle insurance organism creation as admin
export const handleInsuranceOrganismCreationAsAdmin = async (
  formData: FormData
) => {
  try {
    const response = await axios.post('/admin/insuranceOrganisms', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      console.log('Insurance organism created successfully');
      return true;
    } else {
      console.error('Failed to create insurance organism', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error creating insurance organism:', error);
    return false;
  }
};
