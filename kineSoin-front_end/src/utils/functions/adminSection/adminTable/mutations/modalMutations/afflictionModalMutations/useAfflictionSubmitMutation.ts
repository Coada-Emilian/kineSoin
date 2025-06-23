/**
 * @hook useSubmitAfflictionMutation
 *
 * Custom React Query mutation hook to handle the creation of a new affliction as an admin.
 * Validates the submitted `FormData` before sending it to the backend API.
 *
 * @param {() => void} onClose - Function to call when the modal/form should be closed on success.
 *
 * @returns {UseMutationResult} - React Query mutation result with loading, error, and mutate states.
 *
 * @example
 * const mutation = useSubmitAfflictionMutation(handleClose);
 * mutation.mutate(formData);
 *
 * @remarks
 * - Uses `validateAfflictionForm` to ensure the form data is valid before API call.
 * - Calls `handleAfflictionCreationAsAdmin` to submit the form to the backend.
 * - On success:
 *   - Closes the modal/form using the provided `onClose` callback.
 *   - Invalidates the affliction table query (`fetchTableDataRefactor`) to trigger data refetch.
 * - On error:
 *   - Logs the error and uses fallback messaging if necessary.
 *
 * @dependencies
 * - React Query (`useMutation`, `useQueryClient`)
 * - API utilities: `handleAfflictionCreationAsAdmin`
 * - Validation logic: `validateAfflictionForm`
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleAfflictionCreationAsAdmin } from '../../../../../../apiUtils/adminApiUtils/afflictionApiUtils';
import { validateAfflictionForm } from './validations/validateAfflictionForm';

export const useSubmitAfflictionMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['afflictionCreation'],
    mutationFn: async (formData: FormData) => {
      validateAfflictionForm(formData);

      return handleAfflictionCreationAsAdmin(formData);
    },
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['fetchTableDataRefactor', { entityType: 'affliction' }],
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'Une erreur est survenue.';
      console.error('Error creating affliction:', errorMessage);
    },
  });
};
