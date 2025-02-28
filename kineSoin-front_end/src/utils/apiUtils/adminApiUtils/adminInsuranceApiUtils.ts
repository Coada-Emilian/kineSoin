import axios from '../../../axios.ts';

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
