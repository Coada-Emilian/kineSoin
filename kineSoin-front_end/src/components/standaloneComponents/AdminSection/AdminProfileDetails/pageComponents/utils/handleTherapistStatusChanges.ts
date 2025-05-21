import { handleTherapistStatusChangeAsAdmin } from '../../../../../../utils/apiUtils/adminApiUtils/therapist_utils/adminTherapistApiUtils';

export const handleTherapistStatusChanges = async (
  id: number,
  status: string
) => {
  const response = await handleTherapistStatusChangeAsAdmin(id, status);
  if (response) {
    window.location.reload();
  } else {
    console.error('Failed to update therapist status', response);
  }
};
