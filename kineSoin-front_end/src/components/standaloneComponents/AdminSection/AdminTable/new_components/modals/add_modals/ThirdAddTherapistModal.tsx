/**
 * @component ThirdAddTherapistModal
 *
 * A modal for adding a therapist, which allows input of email, password, status, and other required fields.
 * It triggers the therapist creation process and handles submission, including form validation and error messages.
 *
 * @param {boolean} isOpen - Flag indicating whether the modal is open or not.
 * @param {() => void} onClose - Function to close the modal.
 *
 * @returns {JSX.Element} - The rendered modal with the therapist creation form.
 *
 * @example
 * <ThirdAddTherapistModal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 * />
 *
 * @remarks
 * - The form includes email, password fields, and status selection.
 * - The therapist creation is handled via a mutation, and on success, the form closes and the page reloads.
 * - Error handling is built-in for validation and server responses.
 */

import { useEffect, useState } from 'react';
import { useAdminAddTherapistFormGlobalContext } from '../../../../../../../utils/contexts/AdminAddTherapistFormGlobalContext';
import { useGlobalContext } from '../../../../../../../utils/contexts/GlobalContext';
import { addThirdFormDetails } from '../../../../../../../utils/functions/component_utils/page_components/admin_table/add_therapist_form_details';
import { useTherapistCreationMutation } from '../../../../../../../utils/functions/component_utils/page_components/admin_table/modal_mutations/useTherapistCreationMutation';
import StandardDropdownInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardDropdownInputRefactor';
import StandardEmailInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardEmailInputRefactor';
import StandardPasswordInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardPasswordInputRefactor';
import BaseModal from '../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import CreateButtonsSection from '../../page_components/CreateButtonsSection';

interface ThirdAddTherapistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThirdAddTherapistModal({
  isOpen,
  onClose,
}: ThirdAddTherapistModalProps) {
  // State to manage form validation
  const [isAdminTherapistFormValid, setIsAdminTherapistFormValid] =
    useState(false);

  // Destructure the necessary variables from the global context
  const { errorMessage, setError } = useGlobalContext();

  // Destructure the necessary variables from the therapist form context
  const { setAddForm, addForm } = useAdminAddTherapistFormGlobalContext();

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
              id: 'therapist-register-email_input',
              placeholder: "Entrez l'email du kiné",
              name: 'email',
              autoComplete: 'email',
              labelName: 'E-mail',
            }}
          />

          <StandardPasswordInputRefactor
            passwordInput={{
              id: 'therapist-register-password_input',
              name: 'password',
              placeholder: 'Entrez le mot de passe du kiné',
              labelName: 'Mot de passe',
              autoComplete: 'current-password',
              hasInfoIcon: true,
            }}
          />

          <StandardPasswordInputRefactor
            passwordInput={{
              id: 'therapist-register-confirmPassword_input',
              name: 'repeated_password',
              placeholder: 'Confirmez le mot de passe',
              labelName: 'Confirmation mot de passe',
              autoComplete: 'repeated-password',
            }}
          />

          <StandardDropdownInputRefactor
            dropdownInput={{
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

          <CreateButtonsSection onClose={onClose} />
        </form>
      </div>
    </BaseModal>
  );
}
