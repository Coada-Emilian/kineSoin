import { handleTherapistStatusChangeAsAdmin } from '../../../../../../utils/apiUtils/adminApiUtils/adminApiUtils';

export const handleTherapistStatusChanges = async (
  id: number,
  status: string
) => {
  const response = handleTherapistStatusChangeAsAdmin(id, status);
  if (await response) {
    console.log('Therapist status updated successfully');
    window.location.reload();
  } else {
    console.error('Failed to update therapist status', response);
  }
};
