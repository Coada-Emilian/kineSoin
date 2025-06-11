import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleBodyRegionCreationAsAdmin } from '../../../../../../apiUtils/adminApiUtils/body_region_utils/adminBodyRegionApiUtils';
import { validateBodyRegionForm } from '../validations/validateBodyRegionForm';

export const useSubmitRegionMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['regionCreation'],
    mutationFn: async (formData: FormData) => {
      validateBodyRegionForm(formData);
      return handleBodyRegionCreationAsAdmin(formData);
    },
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['fetchBodyRegions'],
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error.message;

      console.error('Error creating region:', errorMessage);
    },
  });
};
