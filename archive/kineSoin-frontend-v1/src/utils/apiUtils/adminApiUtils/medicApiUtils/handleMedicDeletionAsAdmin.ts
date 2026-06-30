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
    // Log the actual error message
    console.error('Error deleting medic:', error);
    // Throw the error with additional information
    throw new Error(
      `Error deleting medic: ${error instanceof Error ? error.message : error}`
    );
  }
};
