import { useMutation, useQueryClient } from '@tanstack/react-query';
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
    },
    onError: (error) => {
      console.error('Failed to update medic profile', error);
    },
  });
};
