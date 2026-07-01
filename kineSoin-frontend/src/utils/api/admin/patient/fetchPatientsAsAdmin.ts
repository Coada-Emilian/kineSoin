import axios from '../../../../axios';

export const fetchPatientsAsAdmin = async () => {
  try {
    const response = await axios.get('/admin/allPatients');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch patients', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching patients:', error);
    return [];
  }
};
