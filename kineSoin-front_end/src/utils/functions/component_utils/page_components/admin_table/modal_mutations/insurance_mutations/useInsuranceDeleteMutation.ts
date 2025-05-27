import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleInsuranceOrganismDeletionAsAdmin } from '../../../../../../apiUtils/adminApiUtils/insurance_utils/handleInsuranceOrganismDeletionAsAdmin';

export function useInsuranceDeleteMutation() {
  const location = useLocation();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['insuranceDelete'],
    mutationFn: ({ id }: { id: number }) =>
      handleInsuranceOrganismDeletionAsAdmin(id),
    onSuccess: () => {
      const isOnPatientDetail = /\/admin\/insurances\/\d+/.test(
        location.pathname
      );

      if (isOnPatientDetail) {
        console.log('Navigating back to list');
        navigate('/admin/insurances');
        window.location.reload();
      } else {
        console.log('Reloading page');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    },
    onError: (error) => {
      console.error('Error deleting insurance organism:', error);
      alert('Failed to delete the insurance organism. Please try again.');
    },
  });
}
