import axios from '../../../../axios.ts';

// Function to handle medic deletion as admin
export const handleMedicDeletionAsAdmin = async (id: number) => {
  try {
    const response = await axios.delete(`/admin/medics/${id}`);
    if (response.status === 200) {
      console.log('Medic profile deleted successfully');
      return true;
    } else {
      throw new Error('Failed to delete medic profile');
    }
  } catch (error) {
    console.error('Error deleting medic:', error);

    throw error;
  }
};
