import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleAfflictionUpdateAsAdmin } from '../../../../../apiUtils/adminApiUtils/affliction_utils/handleAfflictionUpdateAsAdmin';
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
    },
    onError: (error) => {
      console.error('Failed to update affliction profile', error);
    },
  });
};
