import { useState } from 'react';
import BaseModal from '../../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { addFirstFormDetails } from '../utils/addFormDetailsFunctions';
import { useGlobalContext } from '../../../../../../../../utils/contexts/GlobalContext';
import { useAdminAddTherapistFormGlobalContext } from '../../../../../../../../utils/contexts/AdminAddTherapistFormGlobalContext';
import CustomBtn from '../../../../../../generalComponents/CustomButton/CustomButtonRefactor';
import StandardTextInputRefactor from '../../../../../../generalComponents/StandardInputs/new_inputs/StandardTextInputRefactor';
import StandardFileInputRefactor from '../../../../../../generalComponents/StandardInputs/new_inputs/StandardFileInputRefactor';

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
  const [therapistImage, setTherapistImage] = useState<File | null>(null);

  const { errorMessage, setError } = useGlobalContext();

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
              inputId: 'therapist-register-name_input',
              labelName: 'Nom',
              inputName: 'name',
              inputPlaceholder: 'Entrez le nom du kiné',
              isRequired: true,
              autoComplete: 'name',
            }}
          />

          <StandardTextInputRefactor
            textInput={{
              inputId: 'therapist-register-surname_input',
              labelName: 'Prénom',
              inputName: 'surname',
              inputPlaceholder: 'Entrez le prénom du kiné',
              isRequired: true,
              autoComplete: 'surname',
            }}
          />

          <StandardTextInputRefactor
            textInput={{
              inputId: 'therapist-register-licenceCode_input',
              labelName: 'Code ADELI',
              inputName: 'licence_code',
              inputPlaceholder: 'Entrez le code ADELI du kiné',
              isRequired: true,
              autoComplete: 'licence_code',
            }}
          />

          <StandardFileInputRefactor
            fileInput={{
              inputId: 'therapist-register-image_input',
              labelName: 'Ajouter une photo',
              inputName: 'photo',
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
                btnType: 'basicBtn',
                btnText: 'Suivant',
                isNormalBtn: true,
                isFormBtn: true,
              }}
            />

            <CustomBtn
              btn={{
                btnType: 'cancelBtn',
                btnText: 'Annuler',
                isNormalBtn: true,
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
