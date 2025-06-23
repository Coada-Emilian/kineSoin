/**
 * @hook useTherapistCreationMutation
 *
 * Custom React Query mutation hook to create a new therapist record as an admin.
 * It validates the form data, creates a `FormData` object, and sends it via API.
 *
 * @param {IAddForm} addForm - The therapist form data to be validated and submitted.
 * @param {() => void} onClose - Callback to close the modal upon successful submission.
 *
 * @returns {UseMutationResult} React Query mutation object with status and mutation handlers.
 *
 * @example
 * const mutation = useTherapistCreationMutation(addForm, handleClose);
 * mutation.mutate();
 *
 * @remarks
 * - Calls `validateTherapistFormAndCreateFormData` before sending data.
 * - Submits data using `handleTherapistCreationAsAdmin`.
 * - On success:
 *   - Closes the modal.
 *   - Invalidates the therapist table query to refetch updated data.
 * - On error:
 *   - Logs the error message to the console.
 *   - Fallbacks to a generic error message if specific details aren't available.
 *
 * @dependencies
 * - React Query (`useMutation`, `useQueryClient`)
 * - API utilities: `handleTherapistCreationAsAdmin`
 * - Validation logic: `validateTherapistFormAndCreateFormData`
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IAddForm } from '../../../../../../../@types/interfaces/customInterfaces';
import { handleTherapistCreationAsAdmin } from '../../../../../../apiUtils/adminApiUtils/therapistApiUtils/handleTherapistCreationAsAdmin';
import { validateTherapistFormAndCreateFormData } from './validations/validateTherapistFormAndCreateFormData';

export const useTherapistCreationMutation = (
  addForm: IAddForm,
  onClose: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['therapistCreation'],
    mutationFn: () => {
      const newForm = validateTherapistFormAndCreateFormData(addForm);
      return handleTherapistCreationAsAdmin(newForm);
    },

    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['fetchTableDataRefactor', { entityType: 'therapist' }],
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'Une erreur est survenue.';
      console.error('Error creating therapist:', errorMessage);
    },
  });
};
