/**
 * @function handleMedicCreationAsAdmin
 *
 * Sends a POST request to create a new medic as an admin.
 *
 * @param {FormData} formData - The form data containing medic details to be sent to the backend.
 *
 * @returns {Promise<boolean>} Returns `true` if the medic was created successfully (HTTP 201), otherwise returns `false`.
 *
 * @example
 * const success = await handleMedicCreationAsAdmin(formData);
 * if (success) {
 *   // medic created
 * }
 *
 * @details
 * - Sends a POST request to `/admin/medics` with the provided form data.
 * - Sets the `Content-Type` header to `application/json` (note: FormData usually requires `multipart/form-data`).
 * - Logs success or failure messages based on response status.
 * - Catches and logs any errors during the request.
 */

import axios from '../../../../axios.ts';

// Function to handle medic creation as admin
export const handleMedicCreationAsAdmin = async (formData: FormData) => {
  try {
    const response = await axios.post('/admin/medics', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 201) {
      console.log('Medic created successfully');
      return true;
    } else {
      console.error('Failed to create medic', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error creating medic:', error);
    return false;
  }
};
