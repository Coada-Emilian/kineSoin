import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleTherapistStatusChangeAsAdmin } from '../../../functions/apiUtils/admin/therapist/handleTherapistStatusChangeAsAdmin';
import { validateTherapistStatusChangeAsAdmin } from './validators/validateTherapistStatusChangeAsAdmin';

export const useTherapistStatusChangeAsAdminMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['therapistStatusChange'],
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      validateTherapistStatusChangeAsAdmin(id, status);

      return handleTherapistStatusChangeAsAdmin(id, status);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['tableDetails', { entityType: 'therapist' }],
      });

      const isOnTherapistDetail = /\/admin\/therapists\/\d+/.test(
        location.pathname
      );

      if (isOnTherapistDetail) {
        queryClient.invalidateQueries({
          queryKey: ['entityDetails', 'therapist', variables.id],
        });
      }
    },
    onError: (error) => {
      console.error('Failed to update therapist status', error);
    },
  });
};
