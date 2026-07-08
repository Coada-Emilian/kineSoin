import axios from '../../axios';

export const handleUserLogout = async () => {
  await axios.post('/auth/logout');
};
