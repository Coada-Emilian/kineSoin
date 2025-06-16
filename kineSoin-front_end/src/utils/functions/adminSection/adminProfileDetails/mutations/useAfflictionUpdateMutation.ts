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
