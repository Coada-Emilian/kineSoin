import axios from '../../../axios.ts';

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
      throw new Error('Failed to delete affliction');
    }
  } catch (error) {
    // Log the actual error message
    console.error('Error deleting affliction:', error);
    // Throw the error with additional information
    throw new Error(
      `Error deleting affliction: ${error instanceof Error ? error.message : error}`
    );
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
