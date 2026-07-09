import { isAxiosError } from 'axios';
import axios from '../../../axios';

export async function refreshAuthentication() {
  try {
    const response = await axios.post('/auth/refresh');

    const { token, user } = response.data;

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    return {
      token,
      user,
    };
  } catch (error) {
    delete axios.defaults.headers.common.Authorization;

    if (isAxiosError(error) && error.response?.status === 401) {
      return null;
    }

    console.error('Unexpected error refreshing authentication:', error);
    return null;
  }
}
