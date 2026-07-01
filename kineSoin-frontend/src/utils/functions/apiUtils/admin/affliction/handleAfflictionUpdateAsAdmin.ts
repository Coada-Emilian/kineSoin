import axios from '../../../../../axios.ts';

// Function to handle affliction update as admin
export const handleAfflictionUpdateAsAdmin = async (
  id: number,
  formData: FormData
) => {
  try {
    const response = await axios.put(`/admin/afflictions/${id}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      console.log('Affliction updated successfully');
      return true;
    } else {
      console.error('Failed to update affliction', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error updating affliction:', error);
    return false;
  }
};
