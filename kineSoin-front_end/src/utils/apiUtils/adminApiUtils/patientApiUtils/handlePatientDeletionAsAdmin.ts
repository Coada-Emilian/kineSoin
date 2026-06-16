import axios from '../../../../axios.ts';

// Function to handle patient deletion as admin
export const handlePatientDeletionAsAdmin = async (id: number) => {
  try {
    const response = await axios.delete(`/admin/patients/${id}`);
    if (response.status === 200) {
      console.log('Patient profile deleted successfully');
      return true;
    } else {
      throw new Error('Failed to delete patient profile');
    }
  } catch (error) {
    // Log the actual error message
    console.error('Error deleting patient:', error);
    // Throw the error with additional information
    throw new Error(
      `Error deleting patient: ${error instanceof Error ? error.message : error}`
    );
  }
};
