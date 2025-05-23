import { useMutation } from '@tanstack/react-query';
import { handleBodyRegionCreationAsAdmin } from '../../../../../../apiUtils/adminApiUtils/body_region_utils/adminBodyRegionApiUtils';

export const useSubmitRegionMutation = (onClose: () => void) => {
  return useMutation({
    mutationKey: ['regionCreation'],
    mutationFn: async (formData: FormData) => {
      const regionName = formData.get('name') as string;

      if (!regionName) {
        throw new Error('Veuillez remplir tous les champs.');
      } else if (regionName.length > 50) {
        throw new Error('Le nom ne doit pas dépasser 50 caractères.');
      }

      return handleBodyRegionCreationAsAdmin(formData);
    },
    onSuccess: () => {
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error.message;

      console.error('Error creating region:', errorMessage);
    },
  });
};
