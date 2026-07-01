import { useMutation, useQueryClient } from '@tanstack/react-query';
import { validateAfflictionCreationForm } from './validators/validateAfflictionCreationForm';
import { handleAfflictionCreationAsAdmin } from '../../../api/admin/affliction/handleAfflictionCreationAsAdmin';

export const useAfflictionCreationMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['afflictionCreation'],
    mutationFn: async (formData: FormData) => {
      validateAfflictionCreationForm(formData);

      return handleAfflictionCreationAsAdmin(formData);
    },
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['tableDetails', { entityType: 'affliction' }],
      });
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Une erreur est survenue.';
      console.error('Error creating affliction:', errorMessage);
    },
  });
};
