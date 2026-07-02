import axios from '../../../axios.ts';

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
