// ✅ Rename to usePatientDeleteMutation.ts or similar
import { useMutation } from '@tanstack/react-query';
import { handlePatientDeletionAsAdmin } from '../../../../../../apiUtils/adminApiUtils/patient_utils/handlePatientDeletionAsAdmin';

export function usePatientDeleteMutation() {
  return useMutation({
    mutationKey: ['patientDelete'],
    mutationFn: async ({ id }: { id: number }) => {
      if (!id) {
        throw new Error('ID is required for deletion');
      } else {
        console.log('Deleting patient with ID:', id);
        return await handlePatientDeletionAsAdmin(id);
      }
    },
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      console.error('Error deleting patient:', error);
      alert('Failed to delete the patient. Please try again.');
    },
  });
}
