/**
 * Fetches detailed information for a specific affliction by ID for admin purposes.
 *
 * Sends a GET request to the admin API endpoint for the affliction with the given ID.
 * Returns the affliction data if successful (status 200), otherwise logs an error and returns null.
 *
 * @param id - The ID of the affliction to fetch.
 * @returns A promise resolving to the affliction data or null if the fetch fails.
 */

import axios from '../../../../axios.ts';

export const fetchAfflictionAsAdmin = async (id: number) => {
  try {
    const response = await axios.get(`/admin/afflictions/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch affliction', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching affliction:', error);
    return null;
  }
};
