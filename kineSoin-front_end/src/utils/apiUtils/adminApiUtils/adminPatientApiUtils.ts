import axios from '../../../axios.ts';

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
      const response = await axios.put(`/admin/patients/${id}/changeStatus`, {
        status,
      });
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
