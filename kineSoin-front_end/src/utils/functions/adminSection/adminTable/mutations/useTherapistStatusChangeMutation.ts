/**
 * @function useTherapistStatusChangeMutation
 *
 * Custom React Query mutation hook to change the status of a therapist as an admin.
 * Validates the input parameters before sending the status update request.
 * On success, it invalidates the relevant React Query caches to keep data in sync.
 *
 * @returns {UseMutationResult} - The mutation object from React Query, which can be used to trigger the status change and track its state.
 *
 * @example
 * const { mutate } = useTherapistStatusChangeMutation();
 * mutate({ id: 123, status: 'active' });
 */

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
