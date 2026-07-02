import axios from '../../../axios.ts';

export const fetchInsuranceAsAdmin = async (id: number) => {
  try {
    const response = await axios.get(`/admin/insuranceOrganisms/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch insurance organism', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching insurance organism:', error);
    return null;
  }
};
