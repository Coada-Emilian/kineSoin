/**
 * Fetches the list of insurance organisms for the admin panel.
 *
 * Sends a GET request to the '/admin/insuranceOrganisms' endpoint and returns the data if successful.
 * Logs an error and returns an empty array if the request fails or the response status is not 200.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of insurance organisms or an empty array on failure.
 */

import axios from '../../../../axios.ts';

export const fetchInsuranceOrganismsAsAdmin = async () => {
  try {
    const response = await axios.get('/admin/insuranceOrganisms');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch insurance organisms', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching insurance organisms:', error);
    return [];
  }
};
