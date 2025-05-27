import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { handlePatientDeletionAsAdmin } from '../../../../../../apiUtils/adminApiUtils/patient_utils/handlePatientDeletionAsAdmin';

export function usePatientDeleteMutation() {
  const location = useLocation();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['patientDelete'],
    mutationFn: async ({ id }: { id: number }) => {
      if (!id) throw new Error('ID is required for deletion');
      console.log('Deleting patient with ID:', id);
      return await handlePatientDeletionAsAdmin(id);
    },
    onSuccess: () => {
      const isOnPatientDetail = /\/admin\/patients\/\d+/.test(
        location.pathname
      );

      if (isOnPatientDetail) {
        console.log('Navigating back to list');
        navigate('/admin/patients');
        window.location.reload();
      } else {
        console.log('Reloading page');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    },
    onError: (error) => {
      console.error('Error deleting patient:', error);
      alert('Failed to delete the patient. Please try again.');
    },
  });
}
