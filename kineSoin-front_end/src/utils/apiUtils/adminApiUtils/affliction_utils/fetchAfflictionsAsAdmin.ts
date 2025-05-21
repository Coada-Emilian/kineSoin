import axios from '../../../../axios.ts';

// Function to fetch afflictions as admin
export const fetchAfflictionsAsAdmin = async () => {
  try {
    const response = await axios.get('/admin/afflictions');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch afflictions', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching afflictions:', error);
    return [];
  }
};
