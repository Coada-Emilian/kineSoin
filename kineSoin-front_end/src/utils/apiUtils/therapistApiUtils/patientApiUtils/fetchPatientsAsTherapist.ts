import axios from '../../../../axios.ts';

export const fetchPatientsAsTherapist = async () => {
  try {
    const response = await axios.get('/therapist/me/allMyPatients');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch therapist patients', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching therapist patients:', error);
    return [];
  }
};
