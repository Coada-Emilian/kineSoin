import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleInsuranceCreationAsAdmin } from '../../../functions/apiUtils/admin/insurance/handleInsuranceCreationAsAdmin';
import { validateInsuranceCreationForm } from './validators/validateInsuranceCreationForm';

export const useInsuranceCreationMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['insuranceCreation'],
    mutationFn: async (formData: FormData) => {
      validateInsuranceCreationForm(formData);

      return handleInsuranceCreationAsAdmin(formData);
    },
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['tableDetails', { entityType: 'insurance' }],
      });
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Une erreur est survenue.';
      console.error('Error creating insurance:', errorMessage);
    },
  });
};
