/**
 * Fetches detailed information for a specific insurance organism by ID for admin purposes.
 *
 * Sends a GET request to the admin API endpoint for the insurance organism with the given ID.
 * Returns the insurance organism data if successful (status 200), otherwise logs an error and returns null.
 *
 * @param id - The ID of the insurance organism to fetch.
 * @returns A promise resolving to the insurance organism data or null if the fetch fails.
 */

import axios from '../../../../axios.ts';

export const fetchInsuranceOrganismAsAdmin = async (id: number) => {
  try {
    const response = await axios.get(`/admin/insuranceOrganisms/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch insurance organism', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching insurance organism:', error);
    return null;
  }
};
