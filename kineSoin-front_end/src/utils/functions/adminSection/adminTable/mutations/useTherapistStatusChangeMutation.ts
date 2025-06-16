import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleTherapistStatusChangeAsAdmin } from '../../../../apiUtils/adminApiUtils/therapistApiUtils';
import { validateTherapistStatusChange } from './validations/validateTherapistStatusChange';

export const useTherapistStatusChangeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['therapistStatusChange'],
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      validateTherapistStatusChange(id, status);

      return handleTherapistStatusChangeAsAdmin(id, status);
    },
    onSuccess: (_data, variables) => {
      const isOnTherapistDetail = /\/admin\/therapists\/\d+/.test(
        location.pathname
      );

      if (isOnTherapistDetail) {
        queryClient.invalidateQueries({
          queryKey: [
            'fetchDetailsDataRefactor',
            { entityType: 'therapist', entityId: variables.id },
          ],
        });
        
        queryClient.invalidateQueries({
          queryKey: ['fetchTableDataRefactor', { entityType: 'therapist' }],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ['fetchTableDataRefactor', { entityType: 'therapist' }],
        });
      }
    },
    onError: (error) => {
      console.error('Failed to update therapist status', error);
    },
  });
};
