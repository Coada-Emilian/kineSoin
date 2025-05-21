import axios from '../../../../axios.ts';

// Function to fetch an affliction as admin
export const fetchAfflictionAsAdmin = async (id: number) => {
  try {
    const response = await axios.get(`/admin/afflictions/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch affliction', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching affliction:', error);
    return null;
  }
};
