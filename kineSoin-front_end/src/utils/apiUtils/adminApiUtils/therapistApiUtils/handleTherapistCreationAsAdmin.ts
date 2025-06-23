/**
 * @function handleTherapistCreationAsAdmin
 *
 * Sends a POST request to the admin API to create a new therapist with the given form data.
 *
 * @param {FormData} formData - FormData object containing therapist details, including file uploads.
 *
 * @returns {Promise<boolean>} Returns `true` if the therapist was created successfully (HTTP 201), otherwise `false`.
 *
 * @example
 * const success = await handleTherapistCreationAsAdmin(formData);
 * if (success) {
 *   // handle success scenario
 * }
 *
 * @details
 * - Uses axios to send a multipart/form-data POST request to `/admin/therapists`.
 * - Sets appropriate headers for file uploads.
 * - Logs success or error messages to the console.
 * - Catches and logs any errors during the request.
 */

import axios from '../../../../axios.ts';

export const handleTherapistCreationAsAdmin = async (formData: FormData) => {
  try {
    const response = await axios.post('/admin/therapists', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 201) {
      console.log('Therapist created successfully');
      return true;
    } else {
      console.error('Failed to create therapist', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error creating therapist:', error);
    return false;
  }
};
