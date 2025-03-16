/**
 * @component FirstAddTherapistModal
 *
 * This modal component is used for the first step in adding a new therapist.
 * It collects the therapist's personal information and an image.
 *
 * @param {boolean} isOpen - Controls whether the modal is visible.
 * @param {() => void} onClose - Function to close the modal.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsAddTherapistModalP2Open - Function to open the second step modal.
 *
 * @returns {JSX.Element} - The first step modal component for adding a therapist.
 *
 * @example
 * <FirstAddTherapistModal isOpen={isOpen} onClose={onClose} setIsAddTherapistModalP2Open={setStep2Open} />
 *
 * @remarks
 * - Uses `useState` to handle the therapist's image file.
 * - Uses global contexts for managing error messages and form state.
 * - Calls `addFirstFormDetails` on form submission to validate and proceed.
 * - Includes input fields for name, surname, and ADELI code.
 * - Uses `StandardTextInputRefactor` and `StandardFileInputRefactor` for inputs.
 */

import { useState } from 'react';
import BaseModal from '../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { addFirstFormDetails } from '../../../../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/addFormDetailsFunctions';
import { useGlobalContext } from '../../../../../../../utils/contexts/GlobalContext';
import { useAdminAddTherapistFormGlobalContext } from '../../../../../../../utils/contexts/AdminAddTherapistFormGlobalContext';
import CustomBtn from '../../../../../generalComponents/CustomButton/CustomButtonRefactor';
import StandardTextInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardTextInputRefactor';
import StandardFileInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardFileInputRefactor';

interface FirstAddTherapistModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsAddTherapistModalP2Open: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FirstAddTherapistModal({
  isOpen,
  onClose,
  setIsAddTherapistModalP2Open,
}: FirstAddTherapistModalProps) {
  // State to store the therapist image
  const [therapistImage, setTherapistImage] = useState<File | null>(null);

  // Destructure the necessary variables from the global context
  const { errorMessage, setError } = useGlobalContext();

  // Destructure the necessary functions from the admin add therapist form context
  const { setAddForm } = useAdminAddTherapistFormGlobalContext();

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter un thérapeute
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
        )}

        <form
          className="space-y-4 "
          onSubmit={(e) =>
            addFirstFormDetails(e, {
              therapistImage,
              setError,
              setAddForm,
              setIsAddTherapistModalP1Open: onClose,
              setIsAddTherapistModalP2Open: setIsAddTherapistModalP2Open,
            })
          }
        >
          <StandardTextInputRefactor
            textInput={{
              id: 'therapist-register-name_input',
              labelName: 'Nom',
              name: 'name',
              placeholder: 'Entrez le nom du kiné',
              isRequired: true,
              autoComplete: 'name',
            }}
          />

          <StandardTextInputRefactor
            textInput={{
              id: 'therapist-register-surname_input',
              labelName: 'Prénom',
              name: 'surname',
              placeholder: 'Entrez le prénom du kiné',
              isRequired: true,
              autoComplete: 'surname',
            }}
          />

          <StandardTextInputRefactor
            textInput={{
              id: 'therapist-register-licenceCode_input',
              labelName: 'Code ADELI',
              name: 'licence_code',
              placeholder: 'Entrez le code ADELI du kiné',
              isRequired: true,
              autoComplete: 'licence_code',
            }}
          />

          <StandardFileInputRefactor
            fileInput={{
              id: 'therapist-register-image_input',
              labelName: 'Ajouter une photo',
              name: 'photo',
              isRequired: true,
            }}
            setTherapistImage={setTherapistImage}
          />

          <p className="text-red-500 text-center text-xs md:text-sm italic">
            Etape 1 / 3 : Informations personnelles
          </p>

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomBtn
              btn={{
                type: 'basic',
                text: 'Suivant',
                style: 'normal',
              }}
              type="submit"
            />

            <CustomBtn
              btn={{
                type: 'cancel',
                text: 'Annuler',
                style: 'normal',
                onClick: () => {
                  onClose && onClose();
                },
              }}
            />
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
