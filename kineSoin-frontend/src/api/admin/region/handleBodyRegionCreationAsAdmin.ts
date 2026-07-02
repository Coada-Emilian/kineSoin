import axios from '../../../axios.ts';

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
