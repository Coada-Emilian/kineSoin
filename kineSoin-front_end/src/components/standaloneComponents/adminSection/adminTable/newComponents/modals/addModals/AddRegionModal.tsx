/**
 * @component AddRegionModal
 *
 * Modal component to add a new body region through a form.
 *
 * @param {boolean} isOpen - Controls whether the modal is visible.
 * @param {() => void} onClose - Callback to close the modal.
 *
 * @returns {JSX.Element} A modal with a form to submit a new body region.
 *
 * @details
 * - Uses `useSubmitRegionMutation` to handle the form submission asynchronously.
 * - Shows a loader while the submission is in progress.
 * - Displays an error message if the submission fails.
 * - Contains a form with a single text input for the region name and buttons to submit or cancel.
 */

import DNALoader from '../../../../../../../utils/DNALoader';
import { useSubmitRegionMutation } from '../../../../../../../utils/functions/adminSection/adminTable/mutations/modalMutations/bodyRegionModalMutations/useRegionSubmitMutation';
import StandardTextInputRefactor from '../../../../../generalComponents/standardInputs/newInputs/StandardTextInputRefactor';
import BaseModal from '../../../../../privateSection/therapistSection/modals/BaseModal';
import CreateButtonsSection from '../../pageComponents/CreateButtonsSection';

interface AddRegionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddRegionModal({
  isOpen,
  onClose,
}: AddRegionModalProps) {
  // Mutation to handle region creation
  const handleRegionCreation = useSubmitRegionMutation(onClose);

  // Function to handle form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegionCreation.mutate(new FormData(e.currentTarget));
  };

  // If the mutation is pending, display the loader
  if (handleRegionCreation.isPending) {
    return DNALoader();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter une region
        </h2>

        {handleRegionCreation.error && (
          <p className="text-red-500 text-xs text-center">
            {handleRegionCreation.error.message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <StandardTextInputRefactor
            textInput={{
              id: 'region-register-name_input',
              labelName: 'Nom',
              name: 'name',
              placeholder: 'Entrez le nom de la région du corps',
              isRequired: true,
              autoComplete: 'name',
            }}
          />

          <CreateButtonsSection onClose={onClose} />
        </form>
      </div>
    </BaseModal>
  );
}
