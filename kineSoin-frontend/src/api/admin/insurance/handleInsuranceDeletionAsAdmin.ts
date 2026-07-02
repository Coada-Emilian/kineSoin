import axios from '../../../axios.ts';

// Function to handle insurance organism deletion as admin
export const handleInsuranceDeletionAsAdmin = async (id: number) => {
  try {
    const response = await axios.delete(`/admin/insuranceOrganisms/${id}`);
    if (response.status === 200) {
      console.log('Insurance organism deleted successfully');
      return true;
    } else {
      throw new Error('Failed to delete insurance organism');
    }
  } catch (error) {
    console.error('Error deleting insurance:', error);

    throw error;
  }
};
