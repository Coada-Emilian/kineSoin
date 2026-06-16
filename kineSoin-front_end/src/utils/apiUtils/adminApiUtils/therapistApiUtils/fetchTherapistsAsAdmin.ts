/**
 * fetchTherapistsAsAdmin
 *
 * Fetches the list of therapists from the admin API endpoint.
 * Handles successful responses and logs errors if the request fails.
 * Returns an array of therapists or an empty array if an error occurs.
 *
 * @returns {Promise<any[]>} - A promise that resolves to an array of therapists or an empty array on failure.
 */

import axios from '../../../../axios.ts';

export const fetchTherapistsAsAdmin = async () => {
  try {
    const response = await axios.get('/admin/therapists');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch therapists', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching therapists:', error);
    return [];
  }
};
