import axios from '../../../../axios.ts';

export const reduceAppointmentQuantity = async (id: number) => {
  try {
    const response = await axios.patch(
      `/therapist/me/prescriptions/${id}/reduceQuantity`
    );
    if (response.status === 200) {
      console.log('Prescription quantity reduced successfully');
      return true;
    } else {
      console.error('Failed to reduce prescription quantity', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error reducing prescription quantity:', error);
    return false;
  }
};
