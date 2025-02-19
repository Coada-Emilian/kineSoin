import axios from '../axios.ts';
import { setPatientTokenAndDataInLocalStorage } from '../localStorage/patientLocalStorage.ts';
import { setTherapistTokenAndDataInLocalStorage } from '../localStorage/therapistLocalStorage.ts';

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

// Function to fetch therapists as admin
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

// Function to fetch a therapist as admin
export const fetchTherapist = async (id: number) => {
  try {
    const response = await axios.get(`/admin/therapists/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch therapist', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching therapist:', error);
    return null;
  }
};

// Function to handle therapist creation as admin
export const handleTherapistCreation = async (formData: FormData) => {
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

// Function to handle therapist update as admin
export const handleTherapistUpdate = async (id: number, formData: FormData) => {
  try {
    const response = await axios.put(`/admin/therapists/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200) {
      console.log('Therapist profile updated successfully');
      return true;
    } else {
      console.error('Failed to update therapist profile', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error updating therapist profile:', error);
    return false;
  }
};

// Function to handle therapist status change as admin
export const handleTherapistStatusChange = async (id: number) => {
  try {
    const response = await axios.put(`/admin/therapists/${id}/toggleStatus`);
    if (response.status === 200) {
      console.log('Therapist status updated successfully');
      return true;
    } else {
      console.error('Failed to update therapist status', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error updating therapist status:', error);
    return false;
  }
};

// Function to handle therapist deletion as admin
export const handleTherapistDelete = async (id: number) => {
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
};

// Function to fetch patients as admin
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

// Function to fetch a patient as admin
export const fetchPatient = async (id: number) => {
  try {
    const response = await axios.get(`/admin/patients/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch patient', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching patient:', error);
    return null;
  }
};

// Function to handle patient status change as admin
export const handlePatientStatusChange = async (id: number, status: string) => {
  if (id && status) {
    try {
      const response = await axios.put(`/admin/patients/${id}`, { status });
      if (response.status === 200) {
        console.log('Patient status updated successfully');
        return true;
      } else {
        console.error('Failed to update patient status', response.data);
        return false;
      }
    } catch (error) {
      console.error('Error updating patient status:', error);
      return false;
    }
  } else {
    console.error('Patient ID or status is missing or invalid');
    return false;
  }
};

// Function to handle patient deletion as admin
export const handlePatientDelete = async (id: number) => {
  try {
    const response = await axios.delete(`/admin/patients/${id}`);
    if (response.status === 200) {
      console.log('Patient profile deleted successfully');
      return true;
    } else {
      console.error('Failed to delete patient profile', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error deleting patient profile:', error);
    return false;
  }
};

// Function to fetch afflictions as admin
export const fetchAfflictions = async () => {
  try {
    const response = await axios.get('/admin/afflictions');
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

// Function to fetch an affliction as admin
export const fetchAffliction = async (id: number) => {
  try {
    const response = await axios.get(`/admin/afflictions/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch affliction', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching affliction:', error);
    return null;
  }
};

// Function to handle affliction creation as admin
export const handleAfflictionCreation = async (formData: FormData) => {
  try {
    const response = await axios.post('/admin/afflictions', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 201) {
      console.log('Affliction created successfully');
      return true;
    } else {
      console.error('Failed to create affliction', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error creating affliction:', error);
    return false;
  }
};

// Function to handle affliction deletion as admin
export const handleAfflictionDelete = async (id: number) => {
  try {
    const response = await axios.delete(`/admin/afflictions/${id}`);
    if (response.status === 200) {
      console.log('Affliction deleted successfully');
      return true;
    } else {
      console.error('Failed to delete affliction', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error deleting affliction:', error);
    return false;
  }
};

// Function to handle affliction update as admin
export const handleAfflictionUpdate = async (
  id: number,
  formData: FormData
) => {
  try {
    const response = await axios.put(`/admin/afflictions/${id}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      console.log('Affliction updated successfully');
      return true;
    } else {
      console.error('Failed to update affliction', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error updating affliction:', error);
    return false;
  }
};

// Function to fetch medics as admin
export const fetchMedics = async () => {
  try {
    const response = await axios.get('/admin/medics');
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

// Function to fetch a medic as admin
export const fetchMedic = async (id: number) => {
  try {
    const response = await axios.get(`/admin/medics/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch medic', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching medic:', error);
    return null;
  }
};

// Function to handle medic creation as admin
export const handleMedicCreation = async (formData: FormData) => {
  try {
    const response = await axios.post('/admin/medics', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 201) {
      console.log('Medic created successfully');
      return true;
    } else {
      console.error('Failed to create medic', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error creating medic:', error);
    return false;
  }
};

// Function to handle medic update as admin
export const handleMedicUpdate = async (formData: FormData, id: number) => {
  try {
    const response = await axios.put(`/admin/medics/${id}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      console.log('Medic profile updated successfully');
      return true;
    } else {
      console.error('Failed to update medic profile', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error updating medic profile:', error);
    return false;
  }
};

// Function to handle medic deletion as admin
export const handleMedicDelete = async (id: number) => {
  try {
    const response = await axios.delete(`/admin/medics/${id}`);
    if (response.status === 200) {
      console.log('Medic profile deleted successfully');
      return true;
    } else {
      console.error('Failed to delete medic profile', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error deleting medic profile:', error);
    return false;
  }
};

// Function to fetch body regions as admin
export const fetchBodyRegions = async () => {
  try {
    const response = await axios.get('/admin/bodyRegions');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch body regions', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching body regions:', error);
    return null;
  }
};

// Function to handle body region creation as admin
export const handleBodyRegionCreation = async (formData: FormData) => {
  try {
    const response = await axios.post('/admin/bodyRegions', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 201) {
      console.log('Region created successfully');
      return true;
    } else {
      console.error('Failed to create region', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error creating region:', error);
    return false;
  }
};

// Function to handle body region deletion as admin
export const handleRegionDelete = async (id: number) => {
  try {
    const response = await axios.delete(`/admin/bodyRegions/${id}`);
    if (response.status === 200) {
      console.log('Region deleted successfully');
      return true;
    } else {
      console.error('Failed to delete region', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error deleting region:', error);
    return false;
  }
};

// Function to fetch insurance organisms as admin
export const fetchInsuranceOrganisms = async () => {
  try {
    const response = await axios.get('/admin/insuranceOrganisms');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch insurance organisms', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching insurance organisms:', error);
    return [];
  }
};

// Function to fetch an insurance organism as admin
export const fetchInsuranceOrganism = async (id: number) => {
  try {
    const response = await axios.get(`/admin/insuranceOrganisms/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch insurance organism', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching insurance organism:', error);
    return null;
  }
};

// Function to handle insurance organism creation as admin
export const handleInsuranceOrganismCreation = async (formData: FormData) => {
  try {
    const response = await axios.post('/admin/insuranceOrganisms', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      console.log('Insurance organism created successfully');
      return true;
    } else {
      console.error('Failed to create insurance organism', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error creating insurance organism:', error);
    return false;
  }
};

// Function to handle insurance organism deletion as admin
export const handleInsuranceOrganismDelete = async (id: number) => {
  try {
    const response = await axios.delete(`/admin/insuranceOrganisms/${id}`);
    if (response.status === 200) {
      console.log('Insurance organism deleted successfully');
      return true;
    } else {
      console.error('Failed to delete insurance organism', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error deleting insurance organism:', error);
    return false;
  }
};

// Function to handle insurance organism update as admin
export const handleInsuranceOrganismUpdate = async (
  formData: FormData,
  id: number
) => {
  try {
    const response = await axios.put(
      `/admin/insuranceOrganisms/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 200) {
      console.log('Insurance organism updated successfully');
      return true;
    } else {
      console.error('Failed to update insurance organism', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error fetching insurance organism:', error);
    return null;
  }
};

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

export const fetchTherapistDashboardData = async () => {
  try {
    const response = await axios.get('/therapist/me/dashboard');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch therapist dashboard data', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching therapist dashboard data:', error);
    return null;
  }
};

export const sendMessageToPatient = async (id: number, formData: FormData) => {
  try {
    const response = await axios.post(
      `/therapist/me/patients/${id}/messages`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 201) {
      console.log('Message sent successfully');
      return true;
    } else {
      console.error('Failed to send message', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
};

export const cancelAppointment = async (id: number) => {
  try {
    const response = await axios.delete(`/therapist/me/appointments/${id}`);
    if (response.status === 200) {
      console.log('Appointment canceled successfully');
      return true;
    } else {
      console.error('Failed to cancel appointment', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error canceling appointment:', error);
    return false;
  }
};

export const reducePrescriptionQuantity = async (id: number) => {
  try {
    const response = await axios.patch(
      `/therapist/me/prescriptions/${id}/reduceQuantity`
    );
    if (response.status === 200) {
      console.log('Prescription quantity reduced successfully');
      return true;
    } else {
      console.error('Failed to reduce prescription quantity', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error reducing prescription quantity:', error);
    return false;
  }
};
