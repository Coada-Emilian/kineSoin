import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleInsuranceDeletionAsAdmin } from '../../../functions/apiUtils/admin/insurance/handleInsuranceDeletionAsAdmin';
import { validateEntityId } from '../validators/validateEntityId';

export function useInsuranceDeletionMutation() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['insuranceDelete'],
    mutationFn: ({ id }: { id: number }) => {
      validateEntityId(id);
      return handleInsuranceDeletionAsAdmin(id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tableDetails', { entityType: 'insurance' }],
      });

      const isOnInsuranceDetail = /\/admin\/insurances\/\d+/.test(
        location.pathname
      );

      if (isOnInsuranceDetail) {
        navigate('/admin/insurances');
      }
    },
    onError: (error) => {
      console.error('Error deleting insurance organism:', error);
      alert('Failed to delete the insurance organism. Please try again.');
    },
  });
}
