import axios from '../../axios';

export const fetchPrescriptionDetailsAsTherapist = async (
  prescription_id: number
) => {
  try {
    const response = await axios.get(
      `/therapist/prescriptions/${prescription_id}`
    );
    if (response.status != 200) {
      throw new Error(
        `Failed to fetch prescription details: ${response.statusText}`
      );
    } else {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching prescription data:', error);
    return null;
  }
};
