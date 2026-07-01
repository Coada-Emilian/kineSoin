import axios from '../../../../axios';

export const fetchTherapistsAsAdmin = async () => {
  try {
    const response = await axios.get('/admin/therapists');

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch therapists', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching therapists:', error);
    return [];
  }
};
