import { useMutation, useQueryClient } from '@tanstack/react-query';
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
    },
    onError: (error) => {
      console.error('Failed to update insurance details', error);
    },
  });
};
