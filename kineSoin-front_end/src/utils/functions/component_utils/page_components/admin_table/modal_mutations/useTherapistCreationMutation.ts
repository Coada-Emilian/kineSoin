import { useMutation } from '@tanstack/react-query';
import { IAddForm } from '../../../../../../../../@types/formInterfaces';
import { createTherapist } from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/old_components/modals/createTherapist';

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
