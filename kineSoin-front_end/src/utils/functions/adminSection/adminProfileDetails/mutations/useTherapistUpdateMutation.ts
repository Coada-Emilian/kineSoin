import { useMutation, useQueryClient } from '@tanstack/react-query';
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
    },
    onError: (error) => {
      console.error('Failed to update therapist profile', error);
    },
  });
};
