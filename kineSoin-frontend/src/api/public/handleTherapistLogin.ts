import axios from '../../axios';

export const handleTherapistLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post('/auth/therapist/login', {
      email,
      password,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to connect therapist', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error connecting therapist:', error);
    return false;
  }
};
