import axios from '../../../axios';

export const fetchTherapistsAsAdmin = async () => {
  try {
    console.log(
      'Axios auth header:',
      axios.defaults.headers.common.Authorization
    );
    const response = await axios.get('/admin/therapists', {
      headers: {
        Authorization: axios.defaults.headers.common.Authorization,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch therapists', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching therapists:', error);
    return [];
  }
};
