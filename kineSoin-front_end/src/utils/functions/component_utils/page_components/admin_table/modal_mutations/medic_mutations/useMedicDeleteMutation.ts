import { useMutation } from '@tanstack/react-query';
import { handleMedicDeletionAsAdmin } from '../../../../../../apiUtils/adminApiUtils/medic_utils/handleMedicDeletionAsAdmin';

export function useMedicDeleteMutation() {
  return useMutation({
    mutationKey: ['medicDelete'],
    mutationFn: ({ id }: { id: number }) => handleMedicDeletionAsAdmin(id),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      console.error('Error deleting medic:', error);
      alert('Failed to delete the medic. Please try again.');
    },
  });
}
