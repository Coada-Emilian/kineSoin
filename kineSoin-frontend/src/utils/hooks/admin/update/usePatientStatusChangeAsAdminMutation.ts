import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handlePatientStatusChangeAsAdmin } from '../../../api/admin/patient/handlePatientStatusChangeAsAdmin';
import { validatePatientStatusChangeAsAdmin } from './validators/validatePatientStatusChangeAsAdmin';

export const usePatientStatusChangeAsAdminMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['patientStatusChange'],
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      validatePatientStatusChangeAsAdmin(id, status);

      return handlePatientStatusChangeAsAdmin(id, status);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['tableDetails', { entityType: 'patient' }],
      });

      const isOnPatientDetail = /\/admin\/patients\/\d+/.test(
        location.pathname
      );

      if (isOnPatientDetail) {
        queryClient.invalidateQueries({
          queryKey: ['entityDetails', 'patient', variables.id],
        });
      }
    },
    onError: (error) => {
      console.error('Failed to update patient status', error);
    },
  });
};
