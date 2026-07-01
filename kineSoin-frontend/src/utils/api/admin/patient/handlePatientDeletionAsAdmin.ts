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
    console.error('Error deleting patient:', error);

    throw error;
  }
};
