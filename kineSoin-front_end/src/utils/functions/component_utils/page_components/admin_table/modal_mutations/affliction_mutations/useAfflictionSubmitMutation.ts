import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleAfflictionCreationAsAdmin } from '../../../../../../apiUtils/adminApiUtils/affliction_utils/adminAfflictionApiUtils';
import { validateAfflictionForm } from '../validations/validateAfflictionForm';

export const useSubmitAfflictionMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['afflictionCreation'],
    mutationFn: async (formData: FormData) => {
      validateAfflictionForm(formData);

      return handleAfflictionCreationAsAdmin(formData);
    },
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['fetchTableDataRefactor', { entityType: 'affliction' }],
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'Une erreur est survenue.';
      console.error('Error creating affliction:', errorMessage);
    },
  });
};
