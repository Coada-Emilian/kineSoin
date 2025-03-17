import { useMutation } from '@tanstack/react-query';
import { handleTherapistStatusChangeAsAdmin } from '../../../../../../apiUtils/adminApiUtils/adminTherapistApiUtils';

export const useTherapistStatusChangeMutation = () => {
  return useMutation({
    mutationKey: ['therapistStatusChange'],
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      if (!id || !status) {
        throw new Error('Missing required fields');
      } else if (status !== 'active' && status !== 'inactive') {
        throw new Error('Invalid status');
      }

      return handleTherapistStatusChangeAsAdmin(id, status);
    },
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error('Failed to update therapist status', error);
    },
  });
};
