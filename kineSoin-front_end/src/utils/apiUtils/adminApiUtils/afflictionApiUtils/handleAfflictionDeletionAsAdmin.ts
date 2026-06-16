import axios from '../../../../axios.ts';

// Function to handle affliction deletion as admin
export const handleAfflictionDeletionAsAdmin = async (id: number) => {
  try {
    const response = await axios.delete(`/admin/afflictions/${id}`);
    if (response.status === 200) {
      console.log('Affliction deleted successfully');
      return true;
    } else {
      throw new Error('Failed to delete affliction');
    }
  } catch (error) {
    // Log the actual error message
    console.error('Error deleting affliction:', error);
    // Throw the error with additional information
    throw new Error(
      `Error deleting affliction: ${error instanceof Error ? error.message : error}`
    );
  }
};
