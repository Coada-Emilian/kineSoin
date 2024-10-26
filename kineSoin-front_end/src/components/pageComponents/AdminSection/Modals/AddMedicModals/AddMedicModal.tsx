/**
 * @file AddMedicModal.tsx
 * @description A modal component for collecting information to add a new medical professional.
 * It includes fields for the medic's name, surname, license code, telephone number, and address details.
 * The modal provides a form that submits the collected data to create a new medic and options to validate or cancel.
 *
 * @interface AddMedicModalProps
 * @param {boolean} isAddMedicModalOpen - A boolean indicating whether the add medic modal is open or closed.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsAddMedicModalOpen -
 * A function to update the state of the modal's visibility.
 *
 * @returns {JSX.Element} The rendered AddMedicModal component, containing input fields for medic details
 * and action buttons for validating or cancelling the action.
 */

import ReactModal from 'react-modal';
import CustomButton from '../../../../standaloneComponents/Button/CustomButton';
import { handleMedicCreation } from '../../../../../utils/apiUtils';
import NameInput from '../Components/NameInput';
import SurnameInput from '../Components/SurnameInput';
import LicenceCodeInput from '../Components/LicenceCodeInput';
import TelephoneNumberInput from '../Components/TelephoneNumberInput';
import StreetNumberInput from '../Components/StreetNumberInput';
import StreetNameInput from '../Components/StreetNameInput';
import PostalCodeInput from '../Components/PostalCodeInput';
import CityInput from '../Components/CityInput';

interface AddMedicModalProps {
  isAddMedicModalOpen: boolean;
  setIsAddMedicModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddMedicModal({
  isAddMedicModalOpen,
  setIsAddMedicModalOpen,
}: AddMedicModalProps) {
  const createMedic = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await handleMedicCreation(formData);
      if (response) {
        form.reset();
        setIsAddMedicModalOpen(false);
        window.location.reload();
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ReactModal
      isOpen={isAddMedicModalOpen}
      onRequestClose={() => setIsAddMedicModalOpen(false)}
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
          Ajouter un médecin
        </h2>
        <form className="space-y-4" onSubmit={createMedic}>
          <NameInput medic />

          <SurnameInput medic />

          <LicenceCodeInput medic />

          <TelephoneNumberInput medic />

          <div className="flex gap-2">
            <StreetNumberInput medic />

            <StreetNameInput medic />
          </div>

          <div className="flex gap-2">
            <PostalCodeInput medic />

            <CityInput medic />
          </div>

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomButton btnText="Valider" btnType="submit" normalButton />

            <CustomButton
              btnText="Annuler"
              btnType="button"
              cancelButton
              onClick={() => setIsAddMedicModalOpen(false)}
            />
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
