/**
 * @function handleAfflictionCreationAsAdmin
 *
 * Sends a POST request to create a new affliction as an admin.
 *
 * @param {FormData} formData - The form data containing affliction details to be sent to the backend.
 *
 * @returns {Promise<boolean>} Returns `true` if the affliction was created successfully (HTTP 201), otherwise returns `false`.
 *
 * @example
 * const success = await handleAfflictionCreationAsAdmin(formData);
 * if (success) {
 *   // affliction created
 * }
 *
 * @details
 * - Sends a POST request to `/admin/afflictions` with the provided form data.
 * - Sets the `Content-Type` header to `application/json` (note: FormData usually requires `multipart/form-data`).
 * - Logs success or failure messages based on response status.
 * - Catches and logs any errors during the request.
 */

import axios from '../../../../axios.ts';

// Function to handle affliction creation as admin
export const handleAfflictionCreationAsAdmin = async (formData: FormData) => {
  try {
    const response = await axios.post('/admin/afflictions', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 201) {
      console.log('Affliction created successfully');
      return true;
    } else {
      console.error('Failed to create affliction', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error creating affliction:', error);
    return false;
  }
};
