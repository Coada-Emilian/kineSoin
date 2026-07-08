import axios from '../../axios';

export const fetchTherapistDashboardData = async () => {
  try {
    const response = await axios.get('/therapist/me/dashboard');
    console.log(
      'Axios auth header before therapist dashboard request:',
      axios.defaults.headers.common.Authorization
    );
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
