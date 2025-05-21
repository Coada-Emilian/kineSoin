import axios from '../../../../axios.ts';

// Function to handle medic update as admin
export const handleMedicUpdateAsAdmin = async (
  formData: FormData,
  id: number
) => {
  try {
    const response = await axios.put(`/admin/medics/${id}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      console.log('Medic profile updated successfully');
      return true;
    } else {
      console.error('Failed to update medic profile', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error updating medic profile:', error);
    return false;
  }
};
