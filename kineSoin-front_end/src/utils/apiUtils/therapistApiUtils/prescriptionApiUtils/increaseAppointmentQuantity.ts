import axios from '../../../../axios.ts';

export const increaseAppointmentQuantity = async (id: number) => {
  try {
    const response = await axios.patch(
      `/therapist/me/prescriptions/${id}/increaseQuantity`
    );
    if (response.status === 200) {
      console.log('Appointment quantity increased successfully');
      return true;
    } else {
      console.error('Failed to increase appointment quantity', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error increasing appointment quantity:', error);
    return false;
  }
};
