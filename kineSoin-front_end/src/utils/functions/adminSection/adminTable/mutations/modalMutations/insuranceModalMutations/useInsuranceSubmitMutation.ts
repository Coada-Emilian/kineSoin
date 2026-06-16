/**
 * @hook useSubmitInsuranceMutation
 *
 * React Query mutation hook for submitting a new insurance organism creation form as an admin.
 * Validates the FormData before sending it to the backend API.
 *
 * @param {() => void} onClose - Callback to close the modal/form upon successful submission.
 *
 * @returns {UseMutationResult} React Query mutation object containing status, error, and mutate function.
 *
 * @example
 * const insuranceMutation = useSubmitInsuranceMutation(closeModal);
 * insuranceMutation.mutate(formData);
 *
 * @details
 * - Uses `validateInsuranceForm` to ensure the submitted form data meets validation requirements.
 * - Calls `handleInsuranceOrganismCreationAsAdmin` to send the form data to the API.
 * - On success:
 *    - Closes the modal by calling `onClose`.
 *    - Invalidates the query key `fetchTableDataRefactor` for the 'insurance' entity to refresh the data.
 * - On error:
 *    - Logs the error message with a fallback generic error message.
 */

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
