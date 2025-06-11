import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleAfflictionDeletionAsAdmin } from '../../../../../../apiUtils/adminApiUtils/affliction_utils/handleAfflictionDeletionAsAdmin';
import { validateEntityId } from '../validations/validateEntityId';

export function useAfflictionDeleteMutation() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['afflictionDelete'],
    mutationFn: ({ id }: { id: number }) => {
      validateEntityId(id);
      return handleAfflictionDeletionAsAdmin(id);
    },
    onSuccess: () => {
      const isOnAfflictionDetail = /\/admin\/afflictions\/\d+/.test(
        location.pathname
      );

      if (isOnAfflictionDetail) {
        navigate('/admin/afflictions');
      }

      queryClient.invalidateQueries({
        queryKey: ['fetchTableDataRefactor', { entityType: 'affliction' }],
      });
    },
    onError: (error) => {
      console.error('Error deleting affliction:', error);
    },
  });
}
