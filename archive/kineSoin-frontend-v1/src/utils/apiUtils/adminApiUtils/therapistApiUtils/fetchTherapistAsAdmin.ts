/**
 * Fetches detailed information for a specific therapist by ID for admin purposes.
 *
 * Sends a GET request to the admin API endpoint for the therapist with the provided ID.
 * Returns the therapist data if the response is successful (status 200), otherwise logs errors and returns null.
 *
 * @param id - The ID of the therapist to fetch.
 * @returns A promise resolving to the therapist data or null if fetching fails.
 */

import axios from '../../../../axios.ts';

export const fetchTherapistAsAdmin = async (id: number) => {
  try {
    const response = await axios.get(`/admin/therapists/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch therapist', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching therapist:', error);
    return null;
  }
};
