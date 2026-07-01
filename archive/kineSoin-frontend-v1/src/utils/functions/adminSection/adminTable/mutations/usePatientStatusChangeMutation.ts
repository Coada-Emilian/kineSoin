/**
 * @function usePatientStatusChangeMutation
 *
 * Custom React hook that provides a mutation to update a patient's status as an admin.
 * It validates input data, triggers the API request, and handles cache invalidation and UI feedback.
 *
 * @returns {UseMutationResult<boolean, unknown, { id: number; status: string }, unknown>}
 * - Returns a mutation object from React Query for patient status update.
 *
 * @example
 * const mutation = usePatientStatusChangeMutation();
 * mutation.mutate({ id: 123, status: 'active' });
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handlePatientStatusChangeAsAdmin } from '../../../../apiUtils/adminApiUtils/patientApiUtils';
import { validatePatientStatusChange } from './validations/validatePatientStatusChange';

export const usePatientStatusChangeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['patientStatusChange'],
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      validatePatientStatusChange(id, status);

      return handlePatientStatusChangeAsAdmin(id, status);
    },
    onSuccess: (_data, variables) => {
      const isOnPatientDetail = /\/admin\/patients\/\d+/.test(
        location.pathname
      );

      if (isOnPatientDetail) {
        queryClient.invalidateQueries({
          queryKey: [
            'fetchDetailsDataRefactor',
            { entityType: 'patient', entityId: variables.id },
          ],
        });

        queryClient.invalidateQueries({
          queryKey: ['fetchTableDataRefactor', { entityType: 'patient' }],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ['fetchTableDataRefactor', { entityType: 'patient' }],
        });
      }

      toast.success('Statut modifié avec succès !');
    },
    onError: (error) => {
      console.error('Failed to update patient status', error);
      toast.error('Une erreur est survenue.');
    },
  });
};
