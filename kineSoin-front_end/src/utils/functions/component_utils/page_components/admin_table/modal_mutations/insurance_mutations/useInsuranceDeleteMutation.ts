import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleInsuranceOrganismDeletionAsAdmin } from '../../../../../../apiUtils/adminApiUtils/insurance_utils/handleInsuranceOrganismDeletionAsAdmin';
import { validateEntityId } from '../validations/validateEntityId';

export function useInsuranceDeleteMutation() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['insuranceDelete'],
    mutationFn: ({ id }: { id: number }) => {
      validateEntityId(id);
      return handleInsuranceOrganismDeletionAsAdmin(id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['fetchTableDataRefactor', { entityType: 'insurance' }],
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
