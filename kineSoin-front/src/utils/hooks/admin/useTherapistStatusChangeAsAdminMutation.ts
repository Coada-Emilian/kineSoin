import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleTherapistStatusChangeAsAdmin } from '../../functions/apiUtils/admin/therapist/handleTherapistStatusChangeAsAdmin';
import { validateTherapistStatusChangeAsAdmin } from './validators/validateTherapistStautsChangeAsAdmin';

export const useTherapistStatusChangeAsAdminMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['therapistStatusChange'],
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      validateTherapistStatusChangeAsAdmin(id, status);

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
