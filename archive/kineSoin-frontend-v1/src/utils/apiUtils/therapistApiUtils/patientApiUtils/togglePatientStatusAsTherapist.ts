import axios from '../../../../axios.ts';

export const togglePatientStatusAsTherapist = async (id: number) => {
  try {
    const response = await axios.patch(
      `/therapist/me/patients/${id}/toggleStatus`
    );
    if (response.status === 200) {
      console.log('Patient status updated successfully');
      return true;
    } else {
      console.error('Failed to update patient status', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error updating patient status:', error);
    return false;
  }
};
