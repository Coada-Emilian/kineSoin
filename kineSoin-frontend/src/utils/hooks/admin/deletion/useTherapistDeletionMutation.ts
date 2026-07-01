import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleTherapistDeletionAsAdmin } from '../../../api/admin/therapist/handleTherapistDeletionAsAdmin';
import { validateEntityId } from '../validators/validateEntityId';

export function useTherapistDeletionMutation() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['therapistDelete'],
    mutationFn: ({ id }: { id: number }) => {
      validateEntityId(id);

      return handleTherapistDeletionAsAdmin(id);
    },
    onSuccess: () => {
      const isOnTherapistDetail = /\/admin\/therapists\/\d+/.test(
        location.pathname
      );

      if (isOnTherapistDetail) {
        navigate('/admin/therapists');
      }

      queryClient.invalidateQueries({
        queryKey: ['tableDetails', { entityType: 'therapist' }],
      });
    },
    onError: (error) => {
      console.error('Error deleting therapist:', error);
      alert('Failed to delete the therapist. Please try again.');
    },
  });
}
