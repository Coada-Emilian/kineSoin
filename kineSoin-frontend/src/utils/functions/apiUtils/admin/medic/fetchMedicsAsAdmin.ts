import axios from '../../../../../axios.ts';

export const fetchMedicsAsAdmin = async () => {
  try {
    const response = await axios.get('/admin/medics');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch medics', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching medics:', error);
    return [];
  }
};
