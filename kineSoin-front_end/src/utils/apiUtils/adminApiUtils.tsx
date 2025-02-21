import axios from '../../axios.ts';

// Function to fetch therapists as admin
export const fetchTherapistsAsAdmin = async () => {
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
export const fetchTherapistAsAdmin = async (id: number) => {
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

// Function to handle therapist update as admin
export const handleTherapistUpdateAsAdmin = async (
  id: number,
  formData: FormData
) => {
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
export const handleTherapistStatusChangeAsAdmin = async (id: number) => {
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
export const handleTherapistDeleteAsAdmin = async (id: number) => {
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
export const fetchPatientsAsAdmin = async () => {
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
export const fetchPatientAsAdmin = async (id: number) => {
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
export const handlePatientStatusChangeAsAdmin = async (
  id: number,
  status: string
) => {
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
export const handlePatientDeleteAsAdmin = async (id: number) => {
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
export const fetchAfflictionsAsAdmin = async () => {
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
export const fetchAfflictionAsAdmin = async (id: number) => {
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
export const handleAfflictionCreationAsAdmin = async (formData: FormData) => {
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
export const handleAfflictionDeleteAsAdmin = async (id: number) => {
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
export const handleAfflictionUpdateAsAdmin = async (
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
export const fetchMedicsAsAdmin = async () => {
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
export const fetchMedicAsAdmin = async (id: number) => {
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
export const handleMedicCreationAsAdmin = async (formData: FormData) => {
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
export const handleMedicUpdateAsAdmin = async (
  formData: FormData,
  id: number
) => {
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
export const handleMedicDeleteAsAdmin = async (id: number) => {
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
export const fetchBodyRegionsAsAdmin = async () => {
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
export const handleBodyRegionCreationAsAdmin = async (formData: FormData) => {
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
export const handleRegionDeleteAsAdmin = async (id: number) => {
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
export const fetchInsuranceOrganismsAsAdmin = async () => {
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
export const fetchInsuranceOrganismAsAdmin = async (id: number) => {
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
export const handleInsuranceOrganismCreationAsAdmin = async (
  formData: FormData
) => {
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
export const handleInsuranceOrganismDeleteAsAdmin = async (id: number) => {
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
export const handleInsuranceOrganismUpdateAsAdmin = async (
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
