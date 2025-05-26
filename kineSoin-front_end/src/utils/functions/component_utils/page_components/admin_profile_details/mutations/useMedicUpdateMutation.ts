import { useMutation } from '@tanstack/react-query';
import { handleMedicUpdateAsAdmin } from '../../../../../apiUtils/adminApiUtils/medic_utils/handleMedicUpdateAsAdmin';

export const useMedicUpdateMutation = () => {
  return useMutation({
    mutationKey: ['medicUpdate'],
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
        // Replace with actual API call to handle medic update
        return await handleMedicUpdateAsAdmin(id, formData);
      }
    },
    onSuccess: () => {
      console.log('Medic profile updated successfully');
      window.location.reload();
    },
    onError: (error) => {
      console.error('Failed to update medic profile', error);
    },
  });
};
