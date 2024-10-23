import { useState } from 'react';
import ReactModal from 'react-modal';
import CustomButton from '../../../../standaloneComponents/Button/CustomButton';
import { IBodyRegion } from '../../../../../@types/IBodyRegion';
import NameInput from './NameInput';
import RegionInput from './RegionInput';
import InsuranceCodeInput from './InsuranceCodeInput';
import OperatedStatusInput from './OperatedStatusInput';
import DescriptionInput from './DescriptionInput';
import axios from '../../../../../axios.ts';
import { handleAfflictionCreation } from '../../../../../utils/apiUtils';

interface AddAfflictionModalProps {
  isAddAfflictionModalOpen: boolean;
  setIsAddAfflictionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddAfflictionModal({
  isAddAfflictionModalOpen,
  setIsAddAfflictionModalOpen,
}: AddAfflictionModalProps) {
  const [chosenBodyRegionId, setChosenBodyRegionId] = useState<
    number | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const [afflictionOperatedStatus, setAfflictionOperatedStatus] =
    useState<boolean>(false);

  const handleAfflictionSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    if (chosenBodyRegionId !== undefined) {
      formData.append('body_region_id', chosenBodyRegionId.toString());
    }
    formData.append('is_operated', afflictionOperatedStatus.toString());

    try {
      const createdAffliction = await handleAfflictionCreation(formData);

      if (createdAffliction) {
        console.log('Affliction added successfully', createdAffliction);
        setIsAddAfflictionModalOpen(false);
        window.location.reload(); // Consider using a more controlled state update instead of reload
      } else {
        console.error('Failed to create affliction');
      }
    } catch (error) {
      console.error('Error updating affliction:', error);
    }
  };

  {
    loading && <p>Loading...</p>;
  }
  return (
    <ReactModal
      isOpen={isAddAfflictionModalOpen}
      onRequestClose={() => setIsAddAfflictionModalOpen(false)}
      style={{
        content: {
          width: '80vw',
          height: 'fit-content',
          maxWidth: '500px',
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
          Ajouter une affliction
        </h2>
        <form className="space-y-4" onSubmit={handleAfflictionSubmit}>
          <NameInput />
          <RegionInput
            setLoading={setLoading}
            setChosenBodyRegionId={setChosenBodyRegionId}
          />

          <div className="flex gap-1">
            <InsuranceCodeInput />
            <OperatedStatusInput
              setAfflictionOperatedStatus={setAfflictionOperatedStatus}
            />
          </div>

          <DescriptionInput />

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomButton btnText="Valider" btnType="submit" normalButton />
            <CustomButton
              btnText="Annuler"
              btnType="button"
              cancelButton
              onClick={() => setIsAddAfflictionModalOpen(false)}
            />
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
