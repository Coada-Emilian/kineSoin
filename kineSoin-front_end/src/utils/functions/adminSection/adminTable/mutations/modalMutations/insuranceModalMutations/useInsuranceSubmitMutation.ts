import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleInsuranceOrganismCreationAsAdmin } from '../../../../../../apiUtils/adminApiUtils/insuranceApiUtils/handleInsuranceOrganismCreationAsAdmin';
import { validateInsuranceForm } from './validations/validateInsuranceForm';

export const useSubmitInsuranceMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['insuranceCreation'],
    mutationFn: async (formData: FormData) => {
      validateInsuranceForm(formData);
      return handleInsuranceOrganismCreationAsAdmin(formData);
    },
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['fetchTableDataRefactor', { entityType: 'insurance' }],
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur est survenue lors de la création de l'organisme d'assurance.";
      console.error('Error creating insurance:', errorMessage);
    },
  });
};
