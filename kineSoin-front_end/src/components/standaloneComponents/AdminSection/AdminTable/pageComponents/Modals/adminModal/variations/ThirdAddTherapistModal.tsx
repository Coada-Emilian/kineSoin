import { useEffect, useState } from 'react';
import StandardChoiceDropdown from '../../../../../../generalComponents/StandardInputs/old_inputs/StandardDropdownInput';
import BaseModal from '../../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { addThirdFormDetails } from '../utils/addFormDetailsFunctions';
import { createTherapist } from '../utils/createTherapist';
import CustomButton from '../../../../../../generalComponents/CustomButton/CustomButton';
import { useGlobalContext } from '../../../../../../../../utils/contexts/GlobalContext';
import { useAdminAddTherapistFormGlobalContext } from '../../../../../../../../utils/contexts/AdminAddTherapistFormGlobalContext';
import StandardEmailInputRefactor from '../../../../../../generalComponents/StandardInputs/new_inputs/StandardEmailInputRefactor';
import StandardPasswordInputRefactor from '../../../../../../generalComponents/StandardInputs/new_inputs/StandardPasswordInputRefactor';
import StandardDropdownInputRefactor from '../../../../../../generalComponents/StandardInputs/new_inputs/StandardDropdownInputRefactor';

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

  const { errorMessage, setError, setLoading } = useGlobalContext();

  const { setAddForm, addForm } = useAdminAddTherapistFormGlobalContext();

  useEffect(() => {
    if (isAdminTherapistFormValid) {
      setLoading(true);
      createTherapist({
        setError,
        addForm,
        setIsAddTherapistModalP3Open: onClose,
      });
      setLoading(false);
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
          <StandardEmailInputRefactor
            emailInput={{
              inputId: 'therapist-register-email_input',
              inputPlaceholder: "Entrez l'email du kiné",
              inputName: 'email',
              autoComplete: 'email',
            }}
          />

          <StandardPasswordInputRefactor
            passwordInput={{
              inputId: 'therapist-register-password_input',
              inputName: 'password',
              inputPlaceholder: 'Entrez le mot de passe du kiné',
              labelName: 'Mot de passe',
              autoComplete: 'current-password',
              hasInfoIcon: true,
            }}
          />

          <StandardPasswordInputRefactor
            passwordInput={{
              inputId: 'therapist-register-confirmPassword_input',
              inputName: 'repeated_password',
              inputPlaceholder: 'Confirmez le mot de passe',
              labelName: 'Confirmation mot de passe',
              autoComplete: 'repeated-password',
            }}
          />

          <StandardDropdownInputRefactor
            dropdownInput={{
              inputId: 'therapist-register-status_input',
              labelName: 'Statut',
              inputName: 'status',
              autoComplete: 'status',
              isRequired: true,
              allOptions: {
                startingOption: {
                  value: '',
                  text: 'Choisissez le statut',
                },
                options: [
                  {
                    key: '1',
                    value: 'active',
                    text: 'Actif',
                  },
                  {
                    key: '2',
                    value: 'inactive',
                    text: 'Inactif',
                  },
                ],
              },
            }}
          />

          <p className="text-red-500 text-center text-xs md:text-sm italic">
            Etape 3 / 3 : Informations compte
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
