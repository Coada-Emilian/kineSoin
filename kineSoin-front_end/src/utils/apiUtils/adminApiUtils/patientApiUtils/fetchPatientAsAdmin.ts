/**
 * Fetches detailed information for a specific patient by ID for admin purposes.
 *
 * Sends a GET request to the admin API endpoint for the patient with the provided ID.
 * Returns the patient data if the response is successful (status 200), otherwise logs errors and returns null.
 *
 * @param id - The ID of the patient to fetch.
 * @returns A promise resolving to the patient data or null if fetching fails.
 */

import axios from '../../../../axios.ts';

export const fetchPatientAsAdmin = async (id: number) => {
  try {
    const response = await axios.get(`/admin/patients/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch patient', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching patient:', error);
    return null;
  }
};
