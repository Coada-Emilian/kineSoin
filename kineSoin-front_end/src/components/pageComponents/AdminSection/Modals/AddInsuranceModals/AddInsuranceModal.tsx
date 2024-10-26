/**
 * @file AddInsuranceModal.tsx
 * @description A modal component for collecting information to add a new insurance organization.
 * It includes fields for the insurance organization's name, license code, telephone number, and address details.
 * The modal provides a form that submits the collected data to create a new insurance organization and options to validate or cancel.
 *
 * @interface AddInsuranceModalProps
 * @param {boolean} isAddInsuranceModalOpen - A boolean indicating whether the add insurance modal is open or closed.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsAddInsuranceModalOpen -
 * A function to update the state of the modal's visibility.
 *
 * @returns {JSX.Element} The rendered AddInsuranceModal component, containing input fields for insurance details
 * and action buttons for validating or cancelling the action.
 */

import ReactModal from 'react-modal';
import CustomButton from '../../../../standaloneComponents/Button/CustomButton';
import { handleInsuranceOrganismCreation } from '../../../../../utils/apiUtils';
import NameInput from '../Components/NameInput';
import LicenceCodeInput from '../Components/LicenceCodeInput';
import TelephoneNumberInput from '../Components/TelephoneNumberInput';
import StreetNumberInput from '../Components/StreetNumberInput';
import StreetNameInput from '../Components/StreetNameInput';
import PostalCodeInput from '../Components/PostalCodeInput';
import CityInput from '../Components/CityInput';

interface AddInsuranceModalProps {
  isAddInsuranceModalOpen: boolean;
  setIsAddInsuranceModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddInsuranceModal({
  isAddInsuranceModalOpen,
  setIsAddInsuranceModalOpen,
}: AddInsuranceModalProps) {
  const createInsurance = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await handleInsuranceOrganismCreation(formData);
      if (response) {
        form.reset();
        setIsAddInsuranceModalOpen(false);
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
      isOpen={isAddInsuranceModalOpen}
      onRequestClose={() => setIsAddInsuranceModalOpen(false)}
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
          Ajouter un organisme d'assurance
        </h2>
        <form className="space-y-4" onSubmit={createInsurance}>
          <NameInput insurance />

          <LicenceCodeInput insurance />

          <TelephoneNumberInput insurance />

          <div className="flex gap-2">
            <StreetNumberInput insurance />

            <StreetNameInput insurance />
          </div>

          <div className="flex gap-2">
            <PostalCodeInput insurance />

            <CityInput insurance />
          </div>

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomButton btnText="Valider" btnType="submit" normalButton />

            <CustomButton
              btnText="Annuler"
              btnType="button"
              cancelButton
              onClick={() => setIsAddInsuranceModalOpen(false)}
            />
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
