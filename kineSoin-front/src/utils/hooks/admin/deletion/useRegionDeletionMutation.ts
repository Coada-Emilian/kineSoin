import { useMutation } from '@tanstack/react-query';
import { handleRegionDeletionAsAdmin } from '../../../functions/apiUtils/admin/therapist/handleRegionDeletionAsAdmin';
import { validateEntityId } from '../validators/validateEntityId';

export function useRegionDeletionMutation() {
  return useMutation({
    mutationKey: ['regionDelete'],
    mutationFn: ({ id }: { id: number }) => {
      validateEntityId(id);

      return handleRegionDeletionAsAdmin(id);
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error deleting region:', error);
      alert('Failed to delete the region. Please try again.');
    },
  });
}
