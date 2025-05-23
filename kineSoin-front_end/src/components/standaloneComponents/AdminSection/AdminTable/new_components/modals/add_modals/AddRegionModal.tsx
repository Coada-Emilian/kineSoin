import DNALoader from '../../../../../../../utils/DNALoader';
import { useSubmitRegionMutation } from '../../../../../../../utils/functions/component_utils/page_components/admin_table/modal_mutations/region_mutations/useRegionSubmitMutation';
import StandardTextInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardTextInputRefactor';
import BaseModal from '../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import CreateButtonsSection from '../../page_components/CreateButtonsSection';

interface AddRegionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddRegionModal({
  isOpen,
  onClose,
}: AddRegionModalProps) {
  const handleRegionCreation = useSubmitRegionMutation(onClose);

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
