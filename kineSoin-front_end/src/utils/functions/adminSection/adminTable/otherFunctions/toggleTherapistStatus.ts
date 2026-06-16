import { handleTherapistStatusToggleAsAdmin } from '../../../../apiUtils/adminApiUtils/therapistApiUtils';

// Function to handle therapist status change
export const handleTherapistStatus = async (therapistId: number) => {
  const response = await handleTherapistStatusToggleAsAdmin(therapistId);
  if (response) {
    window.location.reload();
  } else {
    console.error('Failed to change therapist status');
  }
};
