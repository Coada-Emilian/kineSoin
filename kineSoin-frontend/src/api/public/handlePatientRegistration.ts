import axios from '../../axios';

// Function to handle patient registration
export const handlePatientRegistration = async (formData: FormData) => {
  try {
    const response = await axios.post('/public/registerPatient', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 201) {
      console.log('Patient registered successfully');
      return true;
    } else {
      console.error('Failed to register patient', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error registering patient:', error);
    return false;
  }
};
