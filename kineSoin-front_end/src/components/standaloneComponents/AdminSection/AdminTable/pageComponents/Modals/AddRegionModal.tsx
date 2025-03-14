// Purpose: The purpose of this component is to render the add region modal.
import BaseModal from '../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { useGlobalContext } from '../../../../../../utils/contexts/GlobalContext';
import { createRegion } from '../../../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/createRegion';
import DNALoader from '../../../../../../utils/DNALoader';
import CreateButtonsSection from '../../new_components/CreateButtonsSection';
import StandardTextInputRefactor from '../../../../generalComponents/StandardInputs/new_inputs/StandardTextInputRefactor';

interface AddRegionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddRegionModal({
  isOpen,
  onClose,
}: AddRegionModalProps) {
  const { errorMessage, isLoading, setLoading } = useGlobalContext();

  if (isLoading) {
    return DNALoader();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter une region
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
        )}

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            await createRegion(e, { onClose }).finally(() => setLoading(false));
          }}
        >
          <StandardTextInputRefactor
            textInput={{
              inputId: 'region-register-name_input',
              labelName: 'Nom',
              inputName: 'name',
              inputPlaceholder: 'Entrez le nom de la région du corps',
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
