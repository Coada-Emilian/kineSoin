import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleTherapistCreationAsAdmin } from '../../../api/admin/therapist/handleTherapistCreationAsAdmin';
import { validateTherapistCreationForm } from './validators/validateTherapistCreationForm';
import type { IAddTherapistFormData } from '../../../@types/interfaces/formInterfaces';

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
        queryKey: ['tableDetails', { entityType: 'therapist' }],
      });
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Une erreur est survenue.';
      console.error('Error creating therapist:', errorMessage);
    },
  });
};
