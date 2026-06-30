/**
 * @hook useTherapistUpdateMutation
 *
 * React Query mutation hook for updating a therapist's profile as an admin.
 * Validates the form data and sends an update request to the backend.
 *
 * @returns {UseMutationResult} React Query mutation object containing status, error, and mutate function.
 *
 * @example
 * const updateTherapist = useTherapistUpdateMutation();
 * updateTherapist.mutate({ id: 1, formData });
 *
 * @details
 * - Uses `validateTherapistUpdateForm` to ensure form data meets validation rules before submission.
 * - Calls `handleTherapistUpdateAsAdmin` to perform the update via API.
 * - On success:
 *    - Invalidates the `fetchDetailsDataRefactor` query for the therapist entity to refresh profile data.
 *    - Displays a success toast notification.
 * - On error:
 *    - Logs the error and shows a toast error message to the user.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { handleTherapistUpdateAsAdmin } from '../../../../apiUtils/adminApiUtils/therapistApiUtils/handleTherapistUpdateAsAdmin';
import { validateTherapistUpdateForm } from './validations/validateTherapistUpdateForm';

export const useTherapistUpdateMutation = () => {
  const clientQuery = useQueryClient();

  return useMutation({
    mutationKey: ['therapistUpdate'],
    mutationFn: async ({
      id,
      formData,
    }: {
      id: number;
      formData: FormData;
    }) => {
      validateTherapistUpdateForm(id, formData);

      return await handleTherapistUpdateAsAdmin(id, formData);
    },
    onSuccess: (_data, variables) => {
      console.log('Therapist profile updated successfully');
      clientQuery.invalidateQueries({
        queryKey: [
          'fetchDetailsDataRefactor',
          { entityType: 'therapist', entityId: variables.id },
        ],
      });
      toast.success('Profil du thérapeute mis à jour avec succès !');
    },
    onError: (error) => {
      console.error('Failed to update therapist profile', error);
      toast.error(
        'Une erreur est survenue lors de la mise à jour du profil du thérapeute.'
      );
    },
  });
};
