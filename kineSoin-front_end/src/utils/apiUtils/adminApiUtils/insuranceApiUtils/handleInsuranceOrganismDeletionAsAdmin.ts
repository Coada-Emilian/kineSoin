import axios from '../../../../axios.ts';

// Function to handle insurance organism deletion as admin
export const handleInsuranceOrganismDeletionAsAdmin = async (id: number) => {
  try {
    const response = await axios.delete(`/admin/insuranceOrganisms/${id}`);
    if (response.status === 200) {
      console.log('Insurance organism deleted successfully');
      return true;
    } else {
      throw new Error('Failed to delete insurance organism');
    }
  } catch (error) {
    // Log the actual error message
    console.error('Error deleting insurance organism:', error);
    // Throw the error with additional information
    throw new Error(
      `Error deleting insurance organism: ${error instanceof Error ? error.message : error}`
    );
  }
};
