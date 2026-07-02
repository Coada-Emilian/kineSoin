import axios from '../../../axios';

export const handleTherapistStatusChangeAsAdmin = async (
  id: number,
  status: string
) => {
  if (id && status) {
    try {
      const response = await axios.put(`/admin/therapists/${id}/changeStatus`, {
        status,
      });
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
  } else {
    console.error('Therapist ID or status is missing or invalid');
    return false;
  }
};
