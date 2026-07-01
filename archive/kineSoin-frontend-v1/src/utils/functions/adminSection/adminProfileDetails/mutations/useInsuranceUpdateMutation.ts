/**
 * @function useInsuranceUpdateMutation
 *
 * Custom React Query mutation hook to update insurance organism details as an admin.
 *
 * Validates the form data, sends the update request, and handles UI feedback.
 *
 * @returns {UseMutationResult<boolean, unknown, { id: number; formData: FormData }>}
 *   A mutation object with status and mutation functions.
 *
 * @example
 * const mutation = useInsuranceUpdateMutation();
 * mutation.mutate({ id: 1, formData: new FormData() });
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { handleInsuranceOrganismUpdateAsAdmin } from '../../../../apiUtils/adminApiUtils/insuranceApiUtils/handleInsuranceOrganismUpdateAsAdmin';
import { validateInsuranceUpdateForm } from './validations/validateInsuranceUpdateForm';

export const useInsuranceUpdateMutation = () => {
  const clientQuery = useQueryClient();
  return useMutation({
    mutationKey: ['insuranceUpdate'],
    mutationFn: async ({
      id,
      formData,
    }: {
      id: number;
      formData: FormData;
    }) => {
      validateInsuranceUpdateForm(id, formData);
      return await handleInsuranceOrganismUpdateAsAdmin(id, formData);
    },
    onSuccess: (_data, variables) => {
      console.log('Insurance details updated successfully');
      clientQuery.invalidateQueries({
        queryKey: [
          'fetchDetailsDataRefactor',
          { entityType: 'insurance', entityId: variables.id },
        ],
      });
      toast.success("Détails de l'assurance mis à jour avec succès !");
    },
    onError: (error) => {
      console.error('Failed to update insurance details', error);
      toast.error(
        "Une erreur est survenue lors de la mise à jour des détails de l'assurance."
      );
    },
  });
};
