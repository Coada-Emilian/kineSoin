import axios from '../../../axios.ts';

export const fetchTherapistDashboardData = async () => {
  try {
    const response = await axios.get('/therapist/me/dashboard');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch therapist dashboard data', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching therapist dashboard data:', error);
    return null;
  }
};
