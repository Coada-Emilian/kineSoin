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
        for (const [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        return await handleTherapistUpdateAsAdmin(id, formData);
      }
    },
    onSuccess: () => {
      console.log('Therapist profile updated successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      console.error('Failed to update therapist profile', error);
    },
  });
};
