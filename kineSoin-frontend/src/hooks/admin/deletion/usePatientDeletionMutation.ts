import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateEntityId } from '../validators/validateEntityId';
import { handlePatientDeletionAsAdmin } from '../../../api/admin/patient/handlePatientDeletionAsAdmin';

export function usePatientDeletionMutation() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['patientDelete'],
    mutationFn: async ({ id }: { id: number }) => {
      validateEntityId(id);
      return await handlePatientDeletionAsAdmin(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tableDetails', { entityType: 'patient' }],
      });

      const isOnPatientDetail = /\/admin\/patients\/\d+/.test(
        location.pathname
      );

      if (isOnPatientDetail) {
        navigate('/admin/patients');
      }
    },
    onError: (error) => {
      console.error('Error deleting patient:', error);
      alert('Failed to delete the patient. Please try again.');
    },
  });
}
