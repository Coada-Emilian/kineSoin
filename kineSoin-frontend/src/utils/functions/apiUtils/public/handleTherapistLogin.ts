import axios from '../../../../axios';
import { setTherapistTokenAndDataInLocalStorage } from '../../../localStorageUtils/therapistLocalStorage';

export const handleTherapistLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post('/public/loginTherapist', {
      email,
      password,
    });

    if (response.status === 200) {
      setTherapistTokenAndDataInLocalStorage(
        response.data.token,
        response.data.fullName,
        response.data.picture_url,
        response.data.id
      );
      return response.data.token;
    } else {
      console.error('Failed to connect therapist', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error connecting therapist:', error);
    return false;
  }
};
