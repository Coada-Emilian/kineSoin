import axios from '../../../../axios.ts';

export const modifyPatientDetailsAsTherapist = async (
  id: number,
  formData: FormData
) => {
  try {
    const response = await axios.patch(
      `/therapist/me/patients/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      console.log('Patient details modified successfully');
      return response.data;
    } else {
      console.error('Failed to modify patient details', response.data);
      throw new Error('Échec de la modification des détails du patient');
    }
  } catch (error) {
    console.error('Error modifying patient details:', error);
    throw new Error('Erreur lors de la modification des détails du patient');
  }
};
