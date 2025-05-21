import axios from '../../../../axios.ts';

export const handleTherapistCreationAsAdmin = async (formData: FormData) => {
  try {
    const response = await axios.post('/admin/therapists', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 201) {
      console.log('Therapist created successfully');
      return true;
    } else {
      console.error('Failed to create therapist', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error creating therapist:', error);
    return false;
  }
};
