// Purpose: The purpose of this component is to render the add region modal.

import ReactModal from 'react-modal';
import CustomButton from '../../../../generalComponents/CustomButton/CustomButton';
import StandardTextInput from '../../../../generalComponents/StandardInputs/StandardTextInput';
import { handleBodyRegionCreation } from '../../../../../../utils/apiUtils';

interface AddRegionModalProps {
  isAddRegionModalOpen: boolean;
  setIsAddRegionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddRegionModal({
  isAddRegionModalOpen,
  setIsAddRegionModalOpen,
}: AddRegionModalProps) {
  const createRegion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const response = await handleBodyRegionCreation(formData);
    if (response) {
      setIsAddRegionModalOpen(false);
      window.location.reload();
    } else {
      console.error('Failed to create region');
    }
  };

  return (
    <ReactModal
      isOpen={isAddRegionModalOpen}
      onRequestClose={() => setIsAddRegionModalOpen(false)}
      style={{
        content: {
          width: '80vw',
          height: 'fit-content',
          maxWidth: '400px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className="space-y-4">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter une region
        </h2>

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
              onClick={() => setIsAddRegionModalOpen(false)}
            />
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
