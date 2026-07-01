import axios from '../../../../axios';

export const handleRegionDeletionAsAdmin = async (id: number) => {
  try {
    const response = await axios.delete(`/admin/bodyRegions/${id}`);
    if (response.status === 200) {
      console.log('Region deleted successfully');
      return true;
    } else {
      throw new Error('Failed to delete region');
    }
  } catch (error) {
    console.error('Error deleting region:', error);

    throw error;
  }
};
