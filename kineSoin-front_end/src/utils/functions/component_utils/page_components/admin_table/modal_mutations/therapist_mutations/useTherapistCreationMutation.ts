import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IAddForm } from '../../../../../../../@types/interfaces/customInterfaces';
import { handleTherapistCreationAsAdmin } from '../../../../../../apiUtils/adminApiUtils/therapist_utils/handleTherapistCreationAsAdmin';
import { validateTherapistFormAndCreateFormData } from '../validations/validateTherapistFormAndCreateFormData';

export const useTherapistCreationMutation = (
  addForm: IAddForm,
  onClose: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['therapistCreation'],
    mutationFn: () => {
      const newForm = validateTherapistFormAndCreateFormData(addForm);
      return handleTherapistCreationAsAdmin(newForm);
    },

    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['fetchTableDataRefactor', { entityType: 'therapist' }],
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'Une erreur est survenue.';
      console.error('Error creating therapist:', errorMessage);
    },
  });
};
