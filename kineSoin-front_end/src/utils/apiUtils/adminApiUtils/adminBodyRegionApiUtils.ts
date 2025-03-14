import axios from '../../../axios.ts';

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

export const handleBodyRegionDeleteAsAdmin = async (id: number) => {
  try {
    const response = await axios.delete(`/admin/bodyRegions/${id}`);
    if (response.status === 200) {
      console.log('Region deleted successfully');
      return true;
    } else {
      throw new Error('Failed to delete region');
    }
  } catch (error) {
    // Log the actual error message
    console.error('Error deleting region:', error);
    // Throw the error with additional information
    throw new Error(
      `Error deleting region: ${error instanceof Error ? error.message : error}`
    );
  }
};
