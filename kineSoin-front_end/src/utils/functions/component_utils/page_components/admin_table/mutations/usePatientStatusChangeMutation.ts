import { useMutation } from '@tanstack/react-query';
import { handlePatientStatusChangeAsAdmin } from '../../../../../apiUtils/adminApiUtils/patient_utils/adminPatientApiUtils';

export const usePatientStatusChangeMutation = () => {
  return useMutation({
    mutationKey: ['patientStatusChange'],
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      if (!id || !status) {
        throw new Error('Missing required fields');
      } else if (
        status !== 'active' &&
        status !== 'inactive' &&
        status !== 'pending' &&
        status !== 'banned'
      ) {
        throw new Error('Invalid status');
      }

      return handlePatientStatusChangeAsAdmin(id, status);
    },
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error('Failed to update patient status', error);
    },
  });
};
