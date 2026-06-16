import axios from '../../../../axios.ts';

export const fetchAllAppointmentsAsTherapist = async () => {
  try {
    const response = await axios.get('/therapist/me/allAppointments');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch appointments', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
};
