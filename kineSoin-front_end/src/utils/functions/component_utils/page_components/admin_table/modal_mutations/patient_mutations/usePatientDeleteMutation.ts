import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { handlePatientDeletionAsAdmin } from '../../../../../../apiUtils/adminApiUtils/patient_utils/handlePatientDeletionAsAdmin';
import { validateEntityId } from '../validations/validateEntityId';

export function usePatientDeleteMutation() {
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
        queryKey: ['fetchTableDataRefactor', { entityType: 'patient' }],
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
