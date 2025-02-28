import axios from '../../../axios.ts';

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
export const handleTherapistStatusChangeAsAdmin = async (
  id: number,
  status: string
) => {
  if (id && status) {
    try {
      const response = await axios.put(`/admin/therapists/${id}/changeStatus`, {
        status,
      });
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
  } else {
    console.error('Therapist ID or status is missing or invalid');
    return false;
  }
};

// Function to handle therapist status toggle as admin
export const handleTherapistStatusToggleAsAdmin = async (id: number) => {
  if (id) {
    try {
      const response = await axios.patch(
        `/admin/therapists/${id}/toggleStatus`
      );
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
