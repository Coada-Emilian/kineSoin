import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleBodyRegionCreationAsAdmin } from '../../../functions/apiUtils/admin/region/handleBodyRegionCreationAsAdmin';
import { validateBodyRegionCreationForm } from './validators/validateBodyRegionCreationForm';

export const useBodyRegionCreationMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['regionCreation'],
    mutationFn: async (formData: FormData) => {
      validateBodyRegionCreationForm(formData);
      return handleBodyRegionCreationAsAdmin(formData);
    },
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['bodyRegions'],
      });
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Une erreur est survenue.';
      console.error('Error creating body region:', errorMessage);
    },
  });
};
