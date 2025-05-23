import { useMutation } from '@tanstack/react-query';
import { handleInsuranceOrganismDeletionAsAdmin } from '../../../../../../apiUtils/adminApiUtils/insurance_utils/handleInsuranceOrganismDeletionAsAdmin';

export function useInsuranceDeleteMutation() {
  return useMutation({
    mutationKey: ['insuranceDelete'],
    mutationFn: ({ id }: { id: number }) =>
      handleInsuranceOrganismDeletionAsAdmin(id),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      console.error('Error deleting insurance organism:', error);
      alert('Failed to delete the insurance organism. Please try again.');
    },
  });
}
