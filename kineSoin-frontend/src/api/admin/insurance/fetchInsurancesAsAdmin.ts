import axios from '../../../axios';

export const fetchInsurancesAsAdmin = async () => {
  try {
    const response = await axios.get('/admin/insuranceOrganisms');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch insurance organisms', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching insurance organisms:', error);
    return [];
  }
};
