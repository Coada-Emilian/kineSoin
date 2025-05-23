import { useMutation } from '@tanstack/react-query';

import { IAddForm } from '../../../../../../../@types/interfaces/customInterfaces';
import { createTherapist } from '../../../../../../../components/standaloneComponents/AdminSection/AdminTable/old_components/modals/createTherapist';

export const useTherapistCreationMutation = (
  addForm: IAddForm,
  onClose: () => void
) => {
  return useMutation({
    mutationKey: ['therapistCreation'],
    mutationFn: () => createTherapist({ addForm }),
    onSuccess: () => {
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
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
