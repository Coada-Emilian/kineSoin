import axios from '../../../../../axios.ts';

export const handleTherapistUpdateAsAdmin = async (
  id: number,
  formData: FormData
) => {
  try {
    const response = await axios.put(`/admin/therapists/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200) {
      console.log('Therapist profile updated successfully');
      return true;
    } else {
      console.error('Failed to update therapist profile', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error updating therapist profile:', error);
    return false;
  }
};
