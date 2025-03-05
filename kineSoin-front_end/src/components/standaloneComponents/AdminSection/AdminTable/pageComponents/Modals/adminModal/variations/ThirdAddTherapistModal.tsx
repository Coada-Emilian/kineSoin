import { useEffect, useState } from 'react';
import StandardChoiceDropdown from '../../../../../../generalComponents/StandardInputs/standardDropdownInput/StandardDropdownInput';
import StandardEmailInput from '../../../../../../generalComponents/StandardInputs/StandardEmailInput';
import StandardPasswordInput from '../../../../../../generalComponents/StandardInputs/StandardPasswordInput';
import BaseModal from '../../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { addThirdFormDetails } from '../utils/addFormDetailsFunctions';
import { createTherapist } from '../utils/createTherapist';
import CustomButton from '../../../../../../generalComponents/CustomButton/CustomButton';
import { useGlobalContext } from '../../../../../../../../utils/contexts/GlobalContext';
import { useAdminAddTherapistFormGlobalContext } from '../../../../../../../../utils/contexts/AdminAddTherapistFormGlobalContext';

interface ThirdAddTherapistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThirdAddTherapistModal({
  isOpen,
  onClose,
}: ThirdAddTherapistModalProps) {
  const [isAdminTherapistFormValid, setIsAdminTherapistFormValid] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { errorMessage, setError } = useGlobalContext();

  const { setAddForm, addForm } = useAdminAddTherapistFormGlobalContext();

  useEffect(() => {
    if (isAdminTherapistFormValid) {
      setIsLoading(true);
      createTherapist({
        setError,
        addForm,
        setIsAddTherapistModalP3Open: onClose,
      });
      setIsLoading(false);
    }
  }, [isAdminTherapistFormValid]);

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
            addThirdFormDetails(e, {
              setError,
              setAddForm,
              setIsAdminTherapistFormValid: setIsAdminTherapistFormValid,
            })
          }
        >
          {' '}
          <StandardEmailInput
            emailInput={{
              inputId: 'admin-therapist-email_input',
              inputPlaceholder: 'E-mail du kinésithérapeute',
            }}
          />
          <StandardPasswordInput
            passwordInput={{
              inputId: 'admin-add-therapist-password_input',
              inputName: 'password',
              inputPlaceholder: 'Entrez le mot de passe',
              labelContent: 'Mot de passe',
              autoComplete: 'new-password',
            }}
          />
          <StandardPasswordInput
            passwordInput={{
              inputId: 'admin-add-therapist-repeated-password_input',
              inputName: 'repeated_password',
              inputPlaceholder: 'Confirmez le mot de passe',
              labelContent: 'Confirmer le mot de passe',
              autoComplete: 'repeated-password',
            }}
          />
          <StandardChoiceDropdown isAdminTherapistAddStatusInput />
          <p className="text-red-500 text-center text-xs md:text-sm">
            Etape 3 / 3 : Finition
          </p>
          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomButton btnText="Valider" btnType="submit" normalButton />

            <CustomButton
              btnText="Annuler"
              btnType="button"
              cancelButton
              onClick={() => {
                onClose && onClose();
              }}
            />
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
