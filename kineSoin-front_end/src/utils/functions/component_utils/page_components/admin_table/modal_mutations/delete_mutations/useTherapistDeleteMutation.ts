import { useMutation } from '@tanstack/react-query';
import { handleTherapistDeletionAsAdmin } from '../../../../../../apiUtils/adminApiUtils/therapist_utils/handleTherapistDeletionAsAdmin';

export function useTherapistDeleteMutation() {
  return useMutation({
    mutationKey: ['therapistDelete'],
    mutationFn: ({ id }: { id: number }) => {
      if (!id) {
        throw new Error('ID is required for deletion');
      } else {
        console.log('Deleting therapist with ID:', id);
        return handleTherapistDeletionAsAdmin(id);
      }
    },
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Delay of 1 second before reloading
    },
    onError: (error) => {
      console.error('Error deleting therapist:', error);
      alert('Failed to delete the therapist. Please try again.');
    },
  });
}
