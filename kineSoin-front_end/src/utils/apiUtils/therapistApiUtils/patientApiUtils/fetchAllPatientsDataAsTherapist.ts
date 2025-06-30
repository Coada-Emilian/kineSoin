import axios from '../../../../axios.ts';

export const fetchAllPatientsDataAsTherapist = async () => {
  try {
    const response = await axios.get('/therapist/me/allPatients');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch all patients data', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching all patients data:', error);
    return [];
  }
};
