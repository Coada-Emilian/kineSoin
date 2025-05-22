import { useMutation } from '@tanstack/react-query';

import { createTherapist } from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/old_components/modals/createTherapist';
import { IAddForm } from '../../../../../../@types/interfaces/customInterfaces';

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
  });
};
