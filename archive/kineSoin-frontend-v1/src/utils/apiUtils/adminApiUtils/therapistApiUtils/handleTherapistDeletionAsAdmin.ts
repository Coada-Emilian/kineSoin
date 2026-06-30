import axios from '../../../../axios.ts';

export const handleTherapistDeletionAsAdmin = async (id: number) => {
  try {
    const response = await axios.delete(`/admin/therapists/${id}`);
    if (response.status === 200) {
      console.log('Therapist profile deleted successfully');
      return true;
    } else {
      throw new Error('Failed to delete therapist profile');
    }
  } catch (error) {
    // Log the actual error message
    console.error('Error deleting therapist:', error);
    // Throw the error with additional information
    throw new Error(
      `Error deleting therapist: ${error instanceof Error ? error.message : error}`
    );
  }
};
