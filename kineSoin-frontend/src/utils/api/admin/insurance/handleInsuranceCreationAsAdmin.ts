import axios from '../../../../axios.ts';

// Function to handle insurance organism creation as admin
export const handleInsuranceCreationAsAdmin = async (formData: FormData) => {
  try {
    const response = await axios.post('/admin/insuranceOrganisms', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 201) {
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
