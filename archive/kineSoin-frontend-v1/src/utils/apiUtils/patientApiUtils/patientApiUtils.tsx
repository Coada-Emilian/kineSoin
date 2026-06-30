import axios from '../../../axios.ts';
import { setTherapistTokenAndDataInLocalStorage } from '../../../localStorage/therapistLocalStorage.ts';

// Function to fetch patient appointments as patient
export const fetchPatientAppointments = async () => {
  try {
    const response = await axios.get(`/patient/me/appointments`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch patient appointments', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    return [];
  }
};

// Function to handle new prescription creation as patient
export const handleNewPrescriptionCreation = async (formData: FormData) => {
  try {
    const response = await axios.post(`/patient/me/prescriptions`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 201) {
      console.log('Prescription created successfully');
      return true;
    } else {
      console.error('Failed to create prescription', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error creating prescription:', error);
    return false;
  }
};

// Function to fetch patient prescriptions as patient
export const fetchPatientPrescriptions = async () => {
  try {
    const response = await axios.get(`/patient/me/prescriptions`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch patient prescriptions', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching patient prescriptions:', error);
    return [];
  }
};

// Functon to fetch patient appointments by prescription as patient
export const fetchPatientAppointmentsByPrescription = async (
  prescription_id: number
) => {
  try {
    const response = await axios.get(
      `/patient/me/prescriptions/${prescription_id}/appointments`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(
        'Failed to fetch appointments by prescription',
        response.data
      );
      return [];
    }
  } catch (error) {
    console.error('Error fetching appointments by prescription:', error);
    return [];
  }
};

// Function to fetch patient messages as patient
export const fetchPatientMessages = async () => {
  try {
    const response = await axios.get(`/patient/me/messages`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch patient messages', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching patient messages:', error);
    return [];
  }
};

// Function to handle patient message creation
export const handlePatientMessageCreation = async (formData: FormData) => {
  try {
    const response = await axios.post(`/patient/me/messages`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      console.log('Message created successfully');
      return true;
    } else {
      console.error('Failed to create message', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error creating message:', error);
    return false;
  }
};

// Function to fetch patient therapist as patient
export const fetchPatientTherapist = async () => {
  try {
    const response = await axios.get(`/patient/me/therapist`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch patient data', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching patient data:', error);
    return null;
  }
};

// Function to fetch patient data as patient
export const fetchPatientData = async () => {
  try {
    const response = await axios.get(`/patient/me`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch patient data', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching patient data:', error);
    return null;
  }
};

// Function to fetch patient insurances as patient
export const fetchInsurancesAsPatient = async () => {
  try {
    const response = await axios.get(`/patient/me/insurances`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch insurances', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching insurances:', error);
    return [];
  }
};

// Function to check patient credentials
export const checkPatientCredentials = async (password: string) => {
  try {
    const response = await axios.post(`/patient/me/checkCredentials`, {
      password,
    });
    if (response.status === 200) {
      return true;
    } else {
      console.error('Failed to check patient credentials', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error checking patient credentials:', error);
    return false;
  }
};

// Function to handle patient insurance creation as patient
export const handlePatientInsuranceAdd = async (formData: FormData) => {
  try {
    const response = await axios.post(`/patient/me/insurance`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      console.log('Insurance added successfully');
      return true;
    } else {
      console.error('Failed to add insurance', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error adding insurance:', error);
    return false;
  }
};

// Function to handle patient update as patient
export const handlePatientUpdate = async (formData: FormData) => {
  try {
    const response = await axios.patch(`/patient/me`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      console.log('Patient profile updated successfully');
      return true;
    } else {
      console.error('Failed to update patient profile', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error updating patient profile:', error);
    return false;
  }
};

// Function to handle patient insurance update as patient
export const handlePatientInsuranceUpdate = async (formData: FormData) => {
  try {
    const response = await axios.patch(`/patient/me/insurance`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      console.log('Insurance updated successfully');
      return true;
    } else {
      console.error('Failed to update insurance', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error updating insurance:', error);
    return false;
  }
};

// Function to handle patient photo update as patient
export const handlePatientPhotoUpdate = async (formData: FormData) => {
  try {
    const response = await axios.post(`/patient/me/uploadPhoto`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200) {
      console.log('Photo updated successfully');
      return response.data.picture_url;
    } else {
      console.error('Failed to update photo', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error updating photo:', error);
    return false;
  }
};

export const handleTherapistConnection = async (
  email: string,
  password: string
) => {
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

export const fetchAllMedicNamesAsPatient = async () => {
  try {
    const response = await axios.get('/patient/me/medicNames');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch medics', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching medics:', error);
    return [];
  }
};

export const fetchAfflictionNamesAsPatient = async () => {
  try {
    const response = await axios.get('/patient/me/afflictionNames');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch afflictions', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching afflictions:', error);
    return [];
  }
};
