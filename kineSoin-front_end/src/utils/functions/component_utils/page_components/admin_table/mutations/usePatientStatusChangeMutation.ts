import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handlePatientStatusChangeAsAdmin } from '../../../../../apiUtils/adminApiUtils/patient_utils/adminPatientApiUtils';
import { validatePatientStatusChange } from './validation/validatePatientStatusChange';

export const usePatientStatusChangeMutation = () => {
  const clientQuery = useQueryClient();
  return useMutation({
    mutationKey: ['patientStatusChange'],
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      validatePatientStatusChange(id, status);

      return handlePatientStatusChangeAsAdmin(id, status);
    },
    onSuccess: (_data, variables) => {
      clientQuery.invalidateQueries({
        queryKey: [
          'fetchDetailsDataRefactor',
          { entityType: 'patient', entityId: variables.id },
        ],
      });
    },
    onError: (error) => {
      console.error('Failed to update patient status', error);
    },
  });
};
