import axios from '../../../axios';

export const fetchBodyRegionsAsAdmin = async () => {
  try {
    const response = await axios.get('/admin/bodyRegions');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch body regions', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching body regions:', error);
    return null;
  }
};
