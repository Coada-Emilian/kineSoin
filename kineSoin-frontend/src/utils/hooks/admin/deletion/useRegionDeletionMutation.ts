import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleRegionDeletionAsAdmin } from '../../../functions/apiUtils/admin/therapist/handleRegionDeletionAsAdmin';
import { validateEntityId } from '../validators/validateEntityId';

export function useRegionDeletionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['regionDelete'],
    mutationFn: ({ id }: { id: number }) => {
      validateEntityId(id);

      return handleRegionDeletionAsAdmin(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bodyRegions'],
      });
    },
    onError: (error) => {
      console.error('Error deleting region:', error);
      alert('Failed to delete the region. Please try again.');
    },
  });
}
