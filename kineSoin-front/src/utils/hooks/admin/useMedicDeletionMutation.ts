import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleMedicDeletionAsAdmin } from '../../functions/apiUtils/admin/medic/handleMedicDeletionAsAdmin';
import { validateEntityId } from './validators/validateEntityId';

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
