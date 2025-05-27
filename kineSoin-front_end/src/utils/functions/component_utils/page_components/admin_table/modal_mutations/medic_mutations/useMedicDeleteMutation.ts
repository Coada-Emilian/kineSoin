import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleMedicDeletionAsAdmin } from '../../../../../../apiUtils/adminApiUtils/medic_utils/handleMedicDeletionAsAdmin';

export function useMedicDeleteMutation() {
  const location = useLocation();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['medicDelete'],
    mutationFn: ({ id }: { id: number }) => handleMedicDeletionAsAdmin(id),
    onSuccess: () => {
      const isOnPatientDetail = /\/admin\/medics\/\d+/.test(location.pathname);

      if (isOnPatientDetail) {
        console.log('Navigating back to list');
        navigate('/admin/medics');
        window.location.reload();
      } else {
        console.log('Reloading page');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    },
    onError: (error) => {
      console.error('Error deleting medic:', error);
      alert('Failed to delete the medic. Please try again.');
    },
  });
}
