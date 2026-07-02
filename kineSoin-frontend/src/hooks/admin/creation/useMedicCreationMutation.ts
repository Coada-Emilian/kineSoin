import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleMedicCreationAsAdmin } from '../../../api/admin/medic/handleMedicCreationAsAdmin';
import { validateMedicCreationForm } from './validators/validateMedicCreationForm';

export const useSubmitMedicMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['medicCreation'],
    mutationFn: async (formData: FormData) => {
      validateMedicCreationForm(formData);
      return handleMedicCreationAsAdmin(formData);
    },
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['tableDetails', { entityType: 'medic' }],
      });
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Une erreur est survenue.';
      console.error('Error creating affliction:', errorMessage);
    },
  });
};
