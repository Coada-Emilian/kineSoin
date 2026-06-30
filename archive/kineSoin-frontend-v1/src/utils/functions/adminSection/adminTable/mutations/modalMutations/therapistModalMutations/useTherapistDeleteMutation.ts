import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleTherapistDeletionAsAdmin } from '../../../../../../apiUtils/adminApiUtils/therapistApiUtils/handleTherapistDeletionAsAdmin';

export function useTherapistDeleteMutation() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['therapistDelete'],
    mutationFn: ({ id }: { id: number }) => {
      if (!id) {
        throw new Error('ID is required for deletion');
      }
      return handleTherapistDeletionAsAdmin(id);
    },
    onSuccess: (_, { id }) => {
      const isOnTherapistDetail = /\/admin\/therapists\/\d+/.test(
        location.pathname
      );

      if (isOnTherapistDetail) {
        // Redirect to list page
        navigate('/admin/therapists');
      }

      // Invalidate table data so it refetches
      queryClient.invalidateQueries({
        queryKey: ['fetchTableDataRefactor', { entityType: 'therapist' }],
      });
    },
    onError: (error) => {
      console.error('Error deleting therapist:', error);
      alert('Failed to delete the therapist. Please try again.');
    },
  });
}
