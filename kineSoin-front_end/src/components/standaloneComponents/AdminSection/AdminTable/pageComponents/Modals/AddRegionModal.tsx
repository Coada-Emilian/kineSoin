// Purpose: The purpose of this component is to render the add region modal.

import ReactModal from 'react-modal';
import CustomButton from '../../../../generalComponents/CustomButton/CustomButton';
import StandardTextInput from '../../../../generalComponents/StandardInputs/standardTextFields/StandardTextInput';
import { handleBodyRegionCreationAsAdmin } from '../../../../../../utils/apiUtils/adminApiUtils/adminApiUtils';
import BaseModal from '../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { on } from 'events';

interface AddRegionModalProps {
  isOpen: boolean;
  onClose: () => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
}

export default function AddRegionModal({
  isOpen,
  onClose,
  setErrorMessage,
  errorMessage,
}: AddRegionModalProps) {
  const createRegion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const response = await handleBodyRegionCreationAsAdmin(formData);
    if (response) {
      onClose && onClose();
      window.location.reload();
    } else {
      console.error('Failed to create region');
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter une region
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
        )}

        <form className="space-y-4" onSubmit={createRegion}>
          <StandardTextInput
            adminRegion={{ isAdminRegionAddNameInput: true }}
          />

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomButton btnText="Valider" btnType="submit" normalButton />

            <CustomButton
              btnText="Annuler"
              btnType="button"
              cancelButton
              onClick={() => onClose && onClose()}
            />
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
