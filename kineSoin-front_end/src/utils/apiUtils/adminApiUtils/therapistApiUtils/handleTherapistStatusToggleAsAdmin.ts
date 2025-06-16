import axios from '../../../../axios.ts';

export const handleTherapistStatusToggleAsAdmin = async (id: number) => {
  if (id) {
    try {
      const response = await axios.patch(
        `/admin/therapists/${id}/toggleStatus`
      );
      if (response.status === 200) {
        console.log('Therapist status updated successfully');
        return true;
      } else {
        console.error('Failed to update therapist status', response.data);
        return false;
      }
    } catch (error) {
      console.error('Error updating therapist status:', error);
      return false;
    }
  }
};
