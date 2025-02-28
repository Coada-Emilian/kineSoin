import axios from '../../../axios.ts';

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
