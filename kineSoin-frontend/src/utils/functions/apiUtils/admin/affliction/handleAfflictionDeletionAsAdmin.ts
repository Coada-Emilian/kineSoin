import axios from '../../../../../axios.ts';

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
    console.error('Error deleting affliction:', error);

    throw error;
  }
};
