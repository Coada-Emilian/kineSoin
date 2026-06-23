import { useEffect, useState } from 'react';
import type { ThirdAddTherapistModalProps } from '../../../../../@types/props/modalProps';
import { handleAddTherapistStepThreeSubmit } from '../../../../../utils/functions/admin/addTherapist/handleAddTherapistStepThreeSubmit';
import { useAdminAddTherapistContext } from '../../../../../utils/functions/contextUtils/useAdminAddTherapistContext';
import { useAppContext } from '../../../../../utils/functions/contextUtils/useAppContext';
import { useTherapistCreationMutation } from '../../../../../utils/hooks/admin/useTherapistCreationMutation';
import DNALoader from '../../../DNALoader';
import DropdownInput from '../../../inputs/DropdownInput';
import EmailInput from '../../../inputs/EmailInput';
import PasswordInput from '../../../inputs/PasswordInput';
import BaseModal from '../../BaseModal';
import ButtonSection from './ButtonSection';

export default function ThirdAddTherapistModal({
  isOpen,
  onClose,
}: ThirdAddTherapistModalProps) {
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
  }, [isAdminTherapistFormValid, handleTherapistCreation]);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter un thérapeute
        </h2>

        {(handleTherapistCreation.error || errorMessage) && (
          <p className="text-red-500 text-xs text-center">
            {handleTherapistCreation.error?.message || errorMessage}
          </p>
        )}

        <form className="space-y-4 " onSubmit={handleFormSubmit}>
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

          <p className="text-red-500 text-center text-xs md:text-sm italic">
            Etape 3 / 3 : Informations compte
          </p>

          <ButtonSection onClose={onClose} />
        </form>
      </div>
    </BaseModal>
  );
}
