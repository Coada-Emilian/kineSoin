import axios from '../../../axios.ts';

export const fetchTherapistsByTherapist = async () => {
  try {
    const response = await axios.get(`/therapist/me/therapists`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(
        'Failed to fetch therapists by therapist ID',
        response.data
      );
      return null;
    }
  } catch (error) {
    console.error('Error fetching therapists by therapist ID:', error);
    return null;
  }
};
