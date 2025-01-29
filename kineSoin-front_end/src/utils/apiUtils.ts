import axios from '../axios.ts';
import { setPatientTokenAndDataInLocalStorage } from '../localStorage/patientLocalStorage.ts';
import { setTherapistTokenAndDataInLocalStorage } from '../localStorage/therapistLocalStorage.ts';

// Admin therapist API calls

// Admin deleting a therapist
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

// Admin fetching therapists
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

// Admin fetching a therapist
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

// Admin updating therapist status
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

export const handleTherapistUpdate = async (formData: FormData, id: number) => {
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

// Admin patient API calls

// Admin fetching patients
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

// Admin fetching a patient
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

// Admin deleting a patient
export const handlePatientDelete = async (id: number) => {
  if (id) {
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
  } else {
    console.error('Patient ID is missing or invalid');
    return false;
  }
};

// Admin affliction API calls
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

// Admin deleting an affliction
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

// Admin creating an affliction
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

export const handleAfflictionUpdates = async (
  formData: FormData,
  id: number
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

// Admin body region API calls

// Admin fetching body regions
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

// Admin creating a body region
export const handleRegionCreation = async (formData: FormData) => {
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

// Admin deleting a body region
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

// Admin medic API calls
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

export const handleMedicUpdates = async (formData: FormData, id: number) => {
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

// Admin deleting a medic
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

// Admin creating a medic
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

// Admin insurance organism API calls
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

// Admin deleting an insurance organism
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

// Admin creating an insurance organism
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

export const handlePatientConnection = async (
  email: string,
  password: string
) => {
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

// Patient API calls
export const fetchPatientAppointments = async (id: number) => {
  try {
    const response = await axios.get(`/patient/${id}/appointments`);
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

export const handleNewPrescriptionCreation = async (
  id: number,
  formData: FormData
) => {
  try {
    const response = await axios.post(
      `/patient/${id}/prescriptions`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

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

export const fetchPatientPrescriptions = async (id: number) => {
  try {
    const response = await axios.get(`/patient/${id}/prescriptions`);
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

export const fetchPatientAppointmentsByPrescription = async (
  prescription_id: number,
  patient_id: number
) => {
  try {
    const response = await axios.get(
      `/patient/${patient_id}/prescriptions/${prescription_id}/appointments`
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
