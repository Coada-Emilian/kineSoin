import axios from '../../../../axios.ts';

export const fetchPatientDataAsTherapist = async (id: number) => {
  try {
    const response = await axios.get(`/therapist/me/patients/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch patient data', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching patient data:', error);
    return null;
  }
};
