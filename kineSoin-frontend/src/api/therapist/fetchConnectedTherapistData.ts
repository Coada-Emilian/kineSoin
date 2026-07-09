import axios from '../../axios';

export const fetchConnectedTherapistData = async () => {
  try {
    const response = await axios.get(`/therapist/me`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch therapist data', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching therapist data:', error);
    return null;
  }
};
