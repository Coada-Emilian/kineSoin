import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateEntityId } from '../validators/validateEntityId';
import { handleMedicDeletionAsAdmin } from '../../../api/admin/medic/handleMedicDeletionAsAdmin';

export function useMedicDeletionMutation() {
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
        queryKey: ['tableDetails', { entityType: 'medic' }],
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
