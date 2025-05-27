import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleTherapistDeletionAsAdmin } from '../../../../../../apiUtils/adminApiUtils/therapist_utils/handleTherapistDeletionAsAdmin';

export function useTherapistDeleteMutation() {
  const location = useLocation();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['therapistDelete'],
    mutationFn: ({ id }: { id: number }) => {
      if (!id) {
        throw new Error('ID is required for deletion');
      } else {
        console.log('Deleting therapist with ID:', id);
        return handleTherapistDeletionAsAdmin(id);
      }
    },
    onSuccess: () => {
      const isOnPatientDetail = /\/admin\/therapists\/\d+/.test(
        location.pathname
      );

      if (isOnPatientDetail) {
        console.log('Navigating back to list');
        navigate('/admin/therapists');
        window.location.reload();
      } else {
        console.log('Reloading page');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    },
    onError: (error) => {
      console.error('Error deleting therapist:', error);
      alert('Failed to delete the therapist. Please try again.');
    },
  });
}
