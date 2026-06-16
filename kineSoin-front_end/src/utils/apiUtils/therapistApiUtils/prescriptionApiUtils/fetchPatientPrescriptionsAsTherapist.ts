import axios from '../../../../axios.ts';

export const fetchPatientPrescriptionsAsTherapist = async (
  patientId: number
) => {
  try {
    const response = await axios.get(
      `/therapist/me/patient/${patientId}/prescriptions`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch patient prescriptions', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching patient prescriptions:', error);
    return [];
  }
};
