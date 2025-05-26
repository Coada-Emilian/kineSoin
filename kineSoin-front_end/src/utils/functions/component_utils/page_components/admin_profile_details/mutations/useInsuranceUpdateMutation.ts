import { useMutation } from '@tanstack/react-query';
import { handleInsuranceOrganismUpdateAsAdmin } from '../../../../../apiUtils/adminApiUtils/insurance_utils/handleInsuranceOrganismUpdateAsAdmin';

export const useInsuranceUpdateMutation = () => {
  return useMutation({
    mutationKey: ['insuranceUpdate'],
    mutationFn: async ({
      id,
      formData,
    }: {
      id: number;
      formData: FormData;
    }) => {
      if (!id || !formData) {
        throw new Error('ID and formData are required for update');
      } else {
        return await handleInsuranceOrganismUpdateAsAdmin(id, formData);
      }
    },
    onSuccess: () => {
      console.log('Insurance details updated successfully');
      window.location.reload();
    },
    onError: (error) => {
      console.error('Failed to update insurance details', error);
    },
  });
};
