import axios from '../../axios.ts';
import { setPatientTokenAndDataInLocalStorage } from '../../localStorage/patientLocalStorage.ts';
import { setTherapistTokenAndDataInLocalStorage } from '../../localStorage/therapistLocalStorage.ts';

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

// Function to handle therapist login
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
