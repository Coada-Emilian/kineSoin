import { handlePatientStatusChangeAsAdmin } from '../../../../../../utils/apiUtils/adminApiUtils/adminApiUtils';

export const handlePatientStatusChanges = async (
  id: number,
  status: string
) => {
  const response = handlePatientStatusChangeAsAdmin(id, status);
  if (await response) {
    console.log('Patient status updated successfully');
    window.location.reload();
  } else {
    console.error('Failed to update patient status', response);
  }
};
