import axios from '../../../../axios.ts';

export const fetchPatientAppointmentsAsTherapist = async (
  patient_id: number
) => {
  try {
    const response = await axios.get(
      `/therapist/me/patient/${patient_id}/appointments`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch patient appointments', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    return [];
  }
};
