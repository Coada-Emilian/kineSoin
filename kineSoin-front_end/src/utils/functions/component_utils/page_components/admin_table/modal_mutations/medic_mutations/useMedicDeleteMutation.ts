import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleMedicDeletionAsAdmin } from '../../../../../../apiUtils/adminApiUtils/medic_utils/handleMedicDeletionAsAdmin';
import { validateEntityId } from '../validations/validateEntityId';

export function useMedicDeleteMutation() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['medicDelete'],
    mutationFn: ({ id }: { id: number }) => {
      validateEntityId(id);
      return handleMedicDeletionAsAdmin(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['fetchTableDataRefactor', { entityType: 'medic' }],
      });

      const isOnMedicDetail = /\/admin\/medics\/\d+/.test(location.pathname);

      if (isOnMedicDetail) {
        navigate('/admin/medics');
      }
    },
    onError: (error) => {
      console.error('Error deleting medic:', error);
      alert('Failed to delete the medic. Please try again.');
    },
  });
}
