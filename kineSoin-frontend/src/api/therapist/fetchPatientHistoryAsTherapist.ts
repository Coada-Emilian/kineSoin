import axios from '../../axios';

export const fetchPatientHistoryAsTherapist = async (patientId: number) => {
  try {
    const response = await axios.get(`/therapist/me/patient/history`, {
      params: {
        patient_id: patientId,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch patient history data', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching patient history data:', error);
    return null;
  }
};
