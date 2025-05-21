import axios from '../../../axios';
import { setPatientTokenAndDataInLocalStorage } from '../../../localStorage/patientLocalStorage';

// Function to handle patient connection
export const handlePatientLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post('/public/loginPatient', {
      email,
      password,
    });
    if (response.status === 200) {
      setPatientTokenAndDataInLocalStorage(
        response.data.token,
        response.data.fullName,
        response.data.picture_url,
        response.data.id
      );
      return response.data.token;
    } else {
      console.error('Failed to connect patient', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error connecting patient:', error);
    return false;
  }
};
