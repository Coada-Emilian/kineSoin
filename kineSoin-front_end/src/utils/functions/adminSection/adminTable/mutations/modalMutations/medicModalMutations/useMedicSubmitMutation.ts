import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleMedicCreationAsAdmin } from '../../../../../../apiUtils/adminApiUtils/medicApiUtils';
import { validateMedicForm } from './validations/validateMedicForm';

export const useSubmitMedicMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['medicCreation'],
    mutationFn: async (formData: FormData) => {
      validateMedicForm(formData);
      return handleMedicCreationAsAdmin(formData);
    },
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['fetchTableDataRefactor', { entityType: 'medic' }],
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'Une erreur est survenue lors de la creation du médecin.';
      console.error('Error creating medic:', errorMessage);
    },
  });
};
