import { useMutation } from '@tanstack/react-query';
import { handleAfflictionUpdateAsAdmin } from '../../../../../apiUtils/adminApiUtils/affliction_utils/handleAfflictionUpdateAsAdmin';

export const useAfflictionUpdateMutation = () => {
  return useMutation({
    mutationKey: ['afflictionUpdate'],
    mutationFn: async ({
      id,
      formData,
    }: {
      id: number;
      formData: FormData;
    }) => {
      if (!id || !formData) {
        throw new Error('ID and formData are required for update');
      } else {
        return await handleAfflictionUpdateAsAdmin(id, formData);
      }
    },
    onSuccess: () => {
      console.log('Affliction profile updated successfully');
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    },
    onError: (error) => {
      console.error('Failed to update affliction profile', error);
    },
  });
};
