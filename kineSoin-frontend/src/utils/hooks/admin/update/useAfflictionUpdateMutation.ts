import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { AdminUpdateMutationProps } from '../../../../@types/props/adminProps';
import { handleAfflictionUpdateAsAdmin } from '../../../api/admin/affliction/handleAfflictionUpdateAsAdmin';
import { validateAfflictionUpdateForm } from './validators/validateAfflictionUpdateForm';

export const useAfflictionUpdateMutation = () => {
  const clientQuery = useQueryClient();
  return useMutation({
    mutationKey: ['afflictionUpdate'],
    mutationFn: async ({ id, formData }: AdminUpdateMutationProps) => {
      validateAfflictionUpdateForm(id, formData);

      return await handleAfflictionUpdateAsAdmin(id, formData);
    },
    onSuccess: (_data, variables) => {
      console.log('Affliction profile updated successfully');

      clientQuery.invalidateQueries({
        queryKey: ['entityDetails', 'affliction', variables.id],
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
