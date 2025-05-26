import { useMutation } from '@tanstack/react-query';
import { handleTherapistUpdateAsAdmin } from '../../../../../apiUtils/adminApiUtils/therapist_utils/handleTherapistUpdateAsAdmin';

export const useTherapistUpdateMutation = () => {
  return useMutation({
    mutationKey: ['therapistUpdate'],
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
        return await handleTherapistUpdateAsAdmin(id, formData);
      }
    },
    onSuccess: () => {
      console.log('Therapist profile updated successfully');
      window.location.reload();
    },
    onError: (error) => {
      console.error('Failed to update therapist profile', error);
    },
  });
};
