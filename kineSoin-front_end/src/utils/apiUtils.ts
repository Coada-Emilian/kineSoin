import axios from '../axios.ts';

export const handleTherapistDelete = async (id: number) => {
  if (id) {
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
  } else {
    console.error('Therapist ID is missing or invalid');
    return false;
  }
};

//   const handleTherapistDelete = async (therapist_id: number) => {
//     if (therapist.id) {
//       try {
//         const response = await axios.delete(
//           `/admin/therapists/${therapist_id}`
//         );
//         if (response.status === 200) {
//           console.log('Therapist profile deleted successfully');
//           navigate('/admin/therapists');
//         } else {
//           console.error('Failed to delete therapist profile', response.data);
//         }
//       } catch (error) {
//         console.error('Error deleting therapist profile:', error);
//       }
//     } else {
//       console.error('Therapist ID is missing or invalid');
//     }
//   };
