/**
 * @file AddAfflictionModal.tsx
 * @description This modal component allows users to add a new affliction by
 * filling out a form with relevant details. It handles the submission of the
 * affliction's information to the server for registration and provides a
 * user interface for input. The modal includes loading state handling
 * and can be closed upon successful submission or cancellation.
 *
 * @interface AddAfflictionModalProps
 * @param {boolean} isAddAfflictionModalOpen - Indicates if the modal is currently open.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsAddAfflictionModalOpen -
 * Function to toggle the visibility of the modal.
 *
 * @returns {JSX.Element} The rendered AddAfflictionModal component, featuring input
 * fields for the affliction's name, body region, insurance code, operated status,
 * and description, along with action buttons for submission or cancellation.
 */

import { useState } from 'react';
import { handleAfflictionCreation } from '../../../../../utils/apiUtils';
import ReactModal from 'react-modal';
import CustomButton from '../../../../standaloneComponents/Button/CustomButton';
import RegionInput from './pageComponents/RegionInput.tsx';
import InsuranceCodeInput from './pageComponents/InsuranceCodeInput.tsx';
import OperatedStatusInput from './pageComponents/OperatedStatusInput.tsx';
import DescriptionInput from './pageComponents/DescriptionInput.tsx';
import NameInput from '../Components/NameInput.tsx';
import LicenceCodeInput from '../Components/LicenceCodeInput.tsx';

interface AddAfflictionModalProps {
  isAddAfflictionModalOpen: boolean;
  setIsAddAfflictionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddAfflictionModal({
  isAddAfflictionModalOpen,
  setIsAddAfflictionModalOpen,
}: AddAfflictionModalProps) {
  // State to store the chosen body region ID
  const [chosenBodyRegionId, setChosenBodyRegionId] = useState<
    number | undefined
  >(undefined);

  // State to store the operated status
  const [afflictionOperatedStatus, setAfflictionOperatedStatus] =
    useState<boolean>(false);

  // Function to handle the submission of the affliction form
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
        window.location.reload();
      } else {
        console.error('Failed to create affliction');
      }
    } catch (error) {
      console.error('Error updating affliction:', error);
    }
  };

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
          <NameInput affliction />

          <RegionInput setChosenBodyRegionId={setChosenBodyRegionId} />

          <div className="flex gap-1">
            <LicenceCodeInput affliction />
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
