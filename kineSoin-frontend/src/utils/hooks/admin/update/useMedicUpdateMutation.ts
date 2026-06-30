import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { AdminUpdateMutationProps } from '../../../../@types/props/adminProps';
import { handleMedicUpdateAsAdmin } from '../../../functions/apiUtils/admin/medic/handleMedicUpdateAsADmin';
import { validateMedicUpdateForm } from './validators/validateMedicUpdateForm';

export const useMedicUpdateMutation = () => {
  const clientQuery = useQueryClient();
  return useMutation({
    mutationKey: ['medicUpdate'],
    mutationFn: async ({ id, formData }: AdminUpdateMutationProps) => {
      validateMedicUpdateForm(id, formData);

      return await handleMedicUpdateAsAdmin(id, formData);
    },
    onSuccess: (_data, variables) => {
      console.log('Medic profile updated successfully');
      clientQuery.invalidateQueries({
        queryKey: ['entityDetails', 'medic', variables.id],
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
