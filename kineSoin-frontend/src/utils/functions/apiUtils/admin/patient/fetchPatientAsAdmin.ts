import axios from '../../../../../axios.ts';

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
