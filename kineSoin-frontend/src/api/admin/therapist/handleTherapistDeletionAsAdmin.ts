import axios from '../../../axios';

export const handleTherapistDeletionAsAdmin = async (id: number) => {
  try {
    const response = await axios.delete(`/admin/therapists/${id}`);

    if (response.status === 200) {
      console.log('Therapist profile deleted successfully');
      return true;
    }

    throw new Error('Failed to delete therapist profile');
  } catch (error) {
    console.error('Error deleting therapist:', error);

    throw error;
  }
};
