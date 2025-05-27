import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleAfflictionDeletionAsAdmin } from '../../../../../../apiUtils/adminApiUtils/affliction_utils/handleAfflictionDeletionAsAdmin';

export function useAfflictionDeleteMutation() {
  const location = useLocation();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['afflictionDelete'],
    mutationFn: ({ id }: { id: number }) => handleAfflictionDeletionAsAdmin(id),
    onSuccess: () => {
      const isOnPatientDetail = /\/admin\/afflictions\/\d+/.test(
        location.pathname
      );

      if (isOnPatientDetail) {
        console.log('Navigating back to list');
        navigate('/admin/afflictions');
        window.location.reload();
      } else {
        console.log('Reloading page');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    },
    onError: (error) => {
      console.error('Error deleting affliction:', error);
    },
  });
}
