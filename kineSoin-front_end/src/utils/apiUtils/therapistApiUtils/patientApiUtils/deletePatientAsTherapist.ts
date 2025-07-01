import axios from '../../../../axios.ts';

export const deletePatientAsTherapist = async (patientId: number) => {
  try {
    const response = await axios.delete(`/therapist/me/patients/${patientId}`);
    if (response.status === 200) {
      console.log(`Patient with ID ${patientId} deleted successfully`);
      return response.data;
    } else {
      console.error('Failed to delete patient', response.data);
      throw new Error('Failed to delete patient');
    }
  } catch (error) {
    console.error('Error deleting patient:', error);
    throw new Error('Failed to delete patient');
  }
};
