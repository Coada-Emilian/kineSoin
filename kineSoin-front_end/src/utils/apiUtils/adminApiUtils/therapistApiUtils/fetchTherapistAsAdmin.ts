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
