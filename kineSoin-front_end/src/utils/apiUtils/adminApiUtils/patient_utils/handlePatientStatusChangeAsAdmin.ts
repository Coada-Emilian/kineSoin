import axios from '../../../../axios.ts';

// Function to handle patient status change as admin
export const handlePatientStatusChangeAsAdmin = async (
  id: number,
  status: string
) => {
  if (id && status) {
    try {
      const response = await axios.put(`/admin/patients/${id}/changeStatus`, {
        status,
      });
      if (response.status === 200) {
        console.log('Patient status updated successfully');
        return true;
      } else {
        console.error('Failed to update patient status', response.data);
        return false;
      }
    } catch (error) {
      console.error('Error updating patient status:', error);
      return false;
    }
  } else {
    console.error('Patient ID or status is missing or invalid');
    return false;
  }
};
