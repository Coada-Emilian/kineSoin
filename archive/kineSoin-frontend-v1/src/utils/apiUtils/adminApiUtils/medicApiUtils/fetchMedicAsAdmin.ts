/**
 * Fetches detailed information for a specific medic by ID for admin purposes.
 *
 * Sends a GET request to the admin API endpoint for the medic with the given ID.
 * Returns the medic data if successful (status 200), otherwise logs an error and returns null.
 *
 * @param id - The ID of the medic to fetch.
 * @returns A promise resolving to the medic data or null if the fetch fails.
 */

import axios from '../../../../axios.ts';

export const fetchMedicAsAdmin = async (id: number) => {
  try {
    const response = await axios.get(`/admin/medics/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch medic', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching medic:', error);
    return null;
  }
};
