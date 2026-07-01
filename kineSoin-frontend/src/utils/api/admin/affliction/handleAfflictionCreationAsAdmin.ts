import axios from '../../../../axios';

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
