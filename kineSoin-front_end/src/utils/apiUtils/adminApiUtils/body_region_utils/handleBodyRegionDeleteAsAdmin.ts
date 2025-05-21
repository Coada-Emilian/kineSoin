import axios from '../../../../axios.ts';

export const handleBodyRegionDeleteAsAdmin = async (id: number) => {
  try {
    const response = await axios.delete(`/admin/bodyRegions/${id}`);
    if (response.status === 200) {
      console.log('Region deleted successfully');
      return true;
    } else {
      throw new Error('Failed to delete region');
    }
  } catch (error) {
    // Log the actual error message
    console.error('Error deleting region:', error);
    // Throw the error with additional information
    throw new Error(
      `Error deleting region: ${error instanceof Error ? error.message : error}`
    );
  }
};
