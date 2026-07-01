import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { AdminUpdateMutationProps } from '../../../../@types/props/adminProps';
import { handleTherapistUpdateAsAdmin } from '../../../functions/apiUtils/admin/therapist/handleTherapistUpdateAsAdmin';
import { validateTherapistUpdateForm } from './validators/validateTherapistUpdateForm';

export const useTherapistUpdateMutation = () => {
  const clientQuery = useQueryClient();

  return useMutation({
    mutationKey: ['therapistUpdate'],
    mutationFn: async ({ id, formData }: AdminUpdateMutationProps) => {
      validateTherapistUpdateForm(id, formData);

      return await handleTherapistUpdateAsAdmin(id, formData);
    },
    onSuccess: (_data, variables) => {
      console.log('Therapist profile updated successfully');
      clientQuery.invalidateQueries({
        queryKey: ['entityDetails', 'therapist', variables.id],
      });
      toast.success('Profil du thérapeute mis à jour avec succès !');
    },
    onError: (error) => {
      console.error('Failed to update therapist profile', error);
      toast.error(
        'Une erreur est survenue lors de la mise à jour du profil du thérapeute.'
      );
    },
  });
};
