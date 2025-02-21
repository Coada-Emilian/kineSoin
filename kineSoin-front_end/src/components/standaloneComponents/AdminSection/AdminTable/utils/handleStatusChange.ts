import { handleTherapistStatusChangeAsAdmin } from '../../../../../utils/apiUtils/adminApiUtils';

// Function to handle therapist status change
export const handleTherapistStatusChange = async (therapistId: number) => {
  const response = await handleTherapistStatusChangeAsAdmin(therapistId);
  if (response) {
    window.location.reload();
  } else {
    console.error('Failed to change therapist status');
  }
};
