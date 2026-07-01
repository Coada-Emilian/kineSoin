/**
 * @function useMedicUpdateMutation
 *
 * Custom React Query mutation hook to update a medic's profile as an admin.
 *
 * @returns {object} React Query mutation object for updating a medic profile.
 *
 * @details
 * - Validates the medic update form data before submission.
 * - Calls the API to update the medic profile with the given ID and form data.
 * - On success:
 *    - Logs a success message.
 *    - Invalidates related queries to refresh medic data.
 *    - Shows a success toast notification.
 * - On error:
 *    - Logs the error.
 *    - Shows an error toast notification.
 *
 * @example
 * const { mutate } = useMedicUpdateMutation();
 * const formData = new FormData();
 * formData.append('name', 'John Doe');
 * mutate({ id: 1, formData });
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { handleMedicUpdateAsAdmin } from '../../../../apiUtils/adminApiUtils/medicApiUtils/handleMedicUpdateAsAdmin';
import { validateMedicUpdateForm } from './validations/validateMedicUpdateForm';

export const useMedicUpdateMutation = () => {
  const clientQuery = useQueryClient();
  return useMutation({
    mutationKey: ['medicUpdate'],
    mutationFn: async ({
      id,
      formData,
    }: {
      id: number;
      formData: FormData;
    }) => {
      validateMedicUpdateForm(id, formData);

      return await handleMedicUpdateAsAdmin(id, formData);
    },
    onSuccess: (_data, variables) => {
      console.log('Medic profile updated successfully');
      clientQuery.invalidateQueries({
        queryKey: [
          'fetchDetailsDataRefactor',
          { entityType: 'medic', entityId: variables.id },
        ],
      });
      toast.success('Profil du médecin mis à jour avec succès !');
    },
    onError: (error) => {
      console.error('Failed to update medic profile', error);
      toast.error(
        'Une erreur est survenue lors de la mise à jour du profil du médecin.'
      );
    },
  });
};
