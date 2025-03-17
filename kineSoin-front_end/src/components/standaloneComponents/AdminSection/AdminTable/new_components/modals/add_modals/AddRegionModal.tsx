/**
 * @function AddRegionModal
 *
 * A modal component that allows users to add a new body region. It includes a text input field
 * for the region name and a "Create" button section for submitting the form.
 *
 * If there is a loading state, a loader (`DNALoader`) is displayed while the region is being created.
 * The region creation logic is managed by `useSubmitRegion`, and the error state is handled by `setError`.
 *
 * @param isOpen - A boolean value that determines if the modal is open.
 * @param onClose - A function to close the modal when called.
 *
 * @returns {JSX.Element} - The AddRegionModal with form elements for adding a new region.
 *
 * @example
 * <AddRegionModal isOpen={isOpen} onClose={onClose} />
 *
 * @remarks
 * - The modal includes error handling and will display an error message if one exists.
 * - The form submission uses the `useSubmitRegion` mutation to create a new region.
 * - The loader (`DNALoader`) is displayed during the creation process.
 */

import BaseModal from '../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { useGlobalContext } from '../../../../../../../utils/contexts/GlobalContext';
import DNALoader from '../../../../../../../utils/DNALoader';
import CreateButtonsSection from '../../page_components/CreateButtonsSection';
import StandardTextInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardTextInputRefactor';
import { useSubmitRegionMutation } from '../../../../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/modals/mutations/useRegionSubmitMutation';

interface AddRegionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddRegionModal({
  isOpen,
  onClose,
}: AddRegionModalProps) {
  const { errorMessage, setError } = useGlobalContext();

  const handleRegionCreation = useSubmitRegionMutation(onClose, setError);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegionCreation.mutate(new FormData(e.currentTarget));
  };

  if (handleRegionCreation.isPending) {
    return DNALoader();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter une region
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage} ||</p>
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
