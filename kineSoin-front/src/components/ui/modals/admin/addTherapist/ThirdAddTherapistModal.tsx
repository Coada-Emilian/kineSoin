import { useEffect, useState } from 'react';
import type { BasicModalProps } from '../../../../../@types/props/modalProps';
import { handleAddTherapistStepThreeSubmit } from '../../../../../utils/functions/admin/addTherapist/handleAddTherapistStepThreeSubmit';
import { useAdminAddTherapistContext } from '../../../../../utils/functions/contextUtils/useAdminAddTherapistContext';
import { useAppContext } from '../../../../../utils/functions/contextUtils/useAppContext';
import { useTherapistCreationMutation } from '../../../../../utils/hooks/admin/creation/useTherapistCreationMutation';
import DNALoader from '../../../DNALoader';
import DropdownInput from '../../../inputs/DropdownInput';
import EmailInput from '../../../inputs/EmailInput';
import PasswordInput from '../../../inputs/PasswordInput';
import TelephoneInput from '../../../inputs/TelephoneInput';
import BaseModal from '../../BaseModal';
import ButtonSection from '../ButtonSection';

export default function ThirdAddTherapistModal({
  isOpen,
  onClose,
}: BasicModalProps) {
  const { countryPrefixes } = useAppContext();
  // State to manage form validation
  const [isAdminTherapistFormValid, setIsAdminTherapistFormValid] =
    useState(false);

  // Destructure the necessary variables from the global context
  const { errorMessage, setError } = useAppContext();

  // Destructure the necessary variables from the therapist form context
  const { setAddForm, addForm } = useAdminAddTherapistContext();

  const handleTherapistCreation = useTherapistCreationMutation(
    addForm,
    onClose
  );

  // Handle the therapist creation on form validation
  useEffect(() => {
    if (isAdminTherapistFormValid) {
      handleTherapistCreation.mutate();
    }
  }, [isAdminTherapistFormValid]);

  function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    handleAddTherapistStepThreeSubmit(e, {
      setError,
      setAddForm,
      setIsAdminTherapistFormValid,
    });
  }

  if (handleTherapistCreation.isPending) {
    return DNALoader();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} variant="compact" size="sm">
      <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-2 md:p-4">
        <h2 className="text-xl md:text-2xl font-semibold text-center text-primaryBlue italic mb-4">
          Ajouter un thérapeute
        </h2>

        <p className="text-center text-sm text-gray-500 mb-2">
          Créez les identifiants du compte thérapeute
        </p>

        {(handleTherapistCreation.error || errorMessage) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-center text-red-600 text-sm">
              {handleTherapistCreation.error?.message || errorMessage}
            </p>
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
          <EmailInput
            input={{
              id: 'therapist-register-email_input',
              placeholder: "Entrez l'email du kiné",
              name: 'email',
              autoComplete: 'email',
              labelName: 'E-mail',
            }}
          />

          <PasswordInput
            input={{
              id: 'therapist-register-password_input',
              name: 'password',
              placeholder: 'Entrez le mot de passe du kiné',
              labelName: 'Mot de passe',
              autoComplete: 'current-password',
              hasInfoIcon: true,
            }}
          />

          <PasswordInput
            input={{
              id: 'therapist-register-confirmPassword_input',
              name: 'repeated_password',
              placeholder: 'Confirmez le mot de passe',
              labelName: 'Confirmation mot de passe',
              autoComplete: 'repeated-password',
            }}
          />

          <div className="flex gap-3 items-end w-full">
            <DropdownInput
              input={{
                id: 'therapist-register-prefix_input',
                labelName: 'Préfixe',
                additionalDivClassName: 'w-1/4',
                name: 'prefix',
                autoComplete: 'prefix',
                isRequired: true,
                allOptions: {
                  startingOption: {
                    value: '',
                    text: 'Préfixe',
                  },
                  options: countryPrefixes.map((country) => ({
                    key: country.name,
                    value: country.prefix,
                    text: `${country.name} ${country.prefix}`,
                  })),
                },
              }}
            />

            <TelephoneInput
              input={{
                id: 'therapist-register-phoneNumber_input',
                isRequired: true,
                additionalDivClassName: 'w-3/4',
                autoComplete: 'phone-number',
                placeholder: 'Entrez le numéro de téléphone du kiné',
              }}
            />
          </div>

          <DropdownInput
            input={{
              id: 'therapist-register-status_input',
              labelName: 'Statut',
              name: 'status',
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

          <p className="text-sm text-center text-primaryBlue font-medium mt-2">
            Étape 3 / 3 : Informations compte
          </p>

          <div className="flex justify-center">
            <ButtonSection onClose={onClose} />
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
