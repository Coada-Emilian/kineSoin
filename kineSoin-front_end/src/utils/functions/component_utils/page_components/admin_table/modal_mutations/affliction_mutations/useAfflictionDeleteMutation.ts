import { useMutation } from '@tanstack/react-query';
import { handleAfflictionDeletionAsAdmin } from '../../../../../../apiUtils/adminApiUtils/affliction_utils/handleAfflictionDeletionAsAdmin';

export function useAfflictionDeleteMutation() {
  return useMutation({
    mutationKey: ['afflictionDelete'],
    mutationFn: ({ id }: { id: number }) => handleAfflictionDeletionAsAdmin(id),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      console.error('Error deleting affliction:', error);
    },
  });
}
