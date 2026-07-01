import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { AdminUpdateMutationProps } from '../../../../@types/props/adminProps';
import { handleInsuranceUpdateAsAdmin } from '../../../functions/apiUtils/admin/insurance/handleInsuranceUpdateAsAdmin';
import { validateInsuranceUpdateForm } from './validators/validateInsuranceUpdateForm';

export const useInsuranceUpdateMutation = () => {
  const clientQuery = useQueryClient();
  return useMutation({
    mutationKey: ['insuranceUpdate'],
    mutationFn: async ({ id, formData }: AdminUpdateMutationProps) => {
      validateInsuranceUpdateForm(id, formData);

      return await handleInsuranceUpdateAsAdmin(id, formData);
    },
    onSuccess: (_data, variables) => {
      console.log('Insurance details updated successfully');
      clientQuery.invalidateQueries({
        queryKey: ['entityDetails', 'insurance', variables.id],
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
