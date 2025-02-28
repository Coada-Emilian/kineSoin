import { handleTherapistStatusChangeAsAdmin } from '../../../../../utils/apiUtils/adminApiUtils';

// Function to handle therapist status change
export const handleTherapistStatusChange = async (
  therapistId: number,
  status: string
) => {
  const response = await handleTherapistStatusChangeAsAdmin(
    therapistId,
    status
  );
  if (response) {
    window.location.reload();
  } else {
    console.error('Failed to change therapist status');
  }
};
