/**
 * @function useAfflictionUpdateMutation
 *
 * Custom React Query mutation hook to update an affliction's profile as an admin.
 *
 * @returns {UseMutationResult<boolean, unknown, { id: number; formData: FormData }, unknown>}
 * - Provides mutation functions and status for updating affliction data.
 *
 * @details
 * - Validates the form data before sending the update request.
 * - Calls the API to update the affliction profile.
 * - On success, invalidates relevant query cache and shows a success toast.
 * - On error, logs the error and shows an error toast.
 *
 * @example
 * const mutation = useAfflictionUpdateMutation();
 * mutation.mutate({ id: 1, formData });
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { handleAfflictionUpdateAsAdmin } from '../../../../apiUtils/adminApiUtils/afflictionApiUtils/handleAfflictionUpdateAsAdmin';
import { validateAfflictionUpdateForm } from './validations/validateAfflictionUpdateForm';

export const useAfflictionUpdateMutation = () => {
  const clientQuery = useQueryClient();
  return useMutation({
    mutationKey: ['afflictionUpdate'],
    mutationFn: async ({
      id,
      formData,
    }: {
      id: number;
      formData: FormData;
    }) => {
      validateAfflictionUpdateForm(id, formData);
      return await handleAfflictionUpdateAsAdmin(id, formData);
    },
    onSuccess: (_data, variables) => {
      console.log('Affliction profile updated successfully');
      clientQuery.invalidateQueries({
        queryKey: [
          'fetchDetailsDataRefactor',
          { entityType: 'affliction', entityId: variables.id },
        ],
      });
      toast.success("Profil de l'affliction mis à jour avec succès !");
    },
    onError: (error) => {
      console.error('Failed to update affliction profile', error);
      toast.error(
        "Une erreur est survenue lors de la mise à jour du profil de l'affliction."
      );
    },
  });
};
