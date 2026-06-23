import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IAddTherapistFormData } from '../../../@types/interfaces/formInterfaces';
import { handleTherapistCreationAsAdmin } from '../../functions/apiUtils/admin/therapist/handleTherapistCreationAsAdmin';
import { validateTherapistCreationForm } from './validators/validateTherapistCreationForm';

export const useTherapistCreationMutation = (
  addForm: IAddTherapistFormData,
  onClose: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['therapistCreation'],
    mutationFn: () => {
      const newForm = validateTherapistCreationForm(addForm);
      return handleTherapistCreationAsAdmin(newForm);
    },

    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['fetchTableDataRefactor', { entityType: 'therapist' }],
      });
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Une erreur est survenue.';
      console.error('Error creating therapist:', errorMessage);
    },
  });
};
