/**
 * @function fetchBodyRegionsAsAdmin
 *
 * Fetches the list of body regions from the admin API.
 *
 * @returns {Promise<any[] | null>} Returns the array of body regions if the request is successful (HTTP 200), otherwise returns `null`.
 *
 * @example
 * const bodyRegions = await fetchBodyRegionsAsAdmin();
 * if (bodyRegions) {
 *   // handle the fetched data
 * }
 *
 * @details
 * - Sends a GET request to `/admin/bodyRegions` endpoint using axios.
 * - Logs errors and returns `null` if the request fails or the response status is not 200.
 */

import axios from '../../../../axios.ts';

export const fetchBodyRegionsAsAdmin = async () => {
  try {
    const response = await axios.get('/admin/bodyRegions');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch body regions', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching body regions:', error);
    return null;
  }
};
