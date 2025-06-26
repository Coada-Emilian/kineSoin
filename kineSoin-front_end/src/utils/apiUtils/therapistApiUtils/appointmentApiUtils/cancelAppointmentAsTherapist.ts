import axios from '../../../../axios.ts';

export const cancelAppointmentAsTherapist = async (id: number) => {
  try {
    const response = await axios.delete(`/therapist/me/appointments/${id}`);
    if (response.status === 200) {
      console.log('Appointment canceled successfully');
      return true;
    } else {
      console.error('Failed to cancel appointment', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error canceling appointment:', error);
    return false;
  }
};
