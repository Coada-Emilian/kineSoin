/**
 * @hook useSubmitMedicMutation
 *
 * React Query mutation hook for submitting a new medic creation form as an admin.
 * Validates the FormData before sending it to the backend API.
 *
 * @param {() => void} onClose - Callback to close the modal/form upon successful submission.
 *
 * @returns {UseMutationResult} React Query mutation object containing status, error, and mutate function.
 *
 * @example
 * const medicMutation = useSubmitMedicMutation(closeModal);
 * medicMutation.mutate(formData);
 *
 * @details
 * - Uses `validateMedicForm` to ensure the submitted form data meets validation requirements.
 * - Calls `handleMedicCreationAsAdmin` to send the form data to the API.
 * - On success:
 *    - Closes the modal by calling `onClose`.
 *    - Invalidates the query key `fetchTableDataRefactor` for the 'medic' entity to refresh the data.
 * - On error:
 *    - Logs the error message with a fallback generic error message.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleMedicCreationAsAdmin } from '../../../../../../apiUtils/adminApiUtils/medicApiUtils';
import { validateMedicForm } from './validations/validateMedicForm';

export const useSubmitMedicMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['medicCreation'],
    mutationFn: async (formData: FormData) => {
      validateMedicForm(formData);
      return handleMedicCreationAsAdmin(formData);
    },
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['fetchTableDataRefactor', { entityType: 'medic' }],
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'Une erreur est survenue lors de la creation du médecin.';
      console.error('Error creating medic:', errorMessage);
    },
  });
};
