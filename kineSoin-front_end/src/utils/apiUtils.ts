import axios from '../axios.ts';

export const handleTherapistDelete = async (id: number) => {
  if (id) {
    try {
      const response = await axios.delete(`/admin/therapists/${id}`);
      if (response.status === 200) {
        console.log('Therapist profile deleted successfully');
        return true;
      } else {
        console.error('Failed to delete therapist profile', response.data);
        return false;
      }
    } catch (error) {
      console.error('Error deleting therapist profile:', error);
      return false;
    }
  } else {
    console.error('Therapist ID is missing or invalid');
    return false;
  }
};

export const fetchTherapists = async () => {
  try {
    const response = await axios.get('/admin/therapists');
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

export const fetchPatients = async () => {
  try {
    const response = await axios.get('/admin/allPatients');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch patients', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching patients:', error);
    return [];
  }
};
