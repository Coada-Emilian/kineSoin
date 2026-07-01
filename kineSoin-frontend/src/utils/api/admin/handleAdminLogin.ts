import axios from '../../../axios';

// Function to handle admin login
export const handleAdminLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post('/admin/login', {
      email,
      password,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to connect admin', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error connecting admin:', error);
    return false;
  }
};
