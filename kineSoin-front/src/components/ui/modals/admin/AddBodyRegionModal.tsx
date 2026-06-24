import type { BasicModalProps } from '../../../../@types/props/modalProps';
import { useBodyRegionCreationMutation } from '../../../../utils/hooks/admin/creation/useBodyRegionCreationMutation';
import DNALoader from '../../DNALoader';
import TextInput from '../../inputs/TextInput';
import BaseModal from '../BaseModal';
import ButtonSection from './ButtonSection';

export default function AddBodyRegionModal({
  isOpen,
  onClose,
}: BasicModalProps) {
  const handleRegionCreation = useBodyRegionCreationMutation(onClose);

  // Function to handle form submission
  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
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
          <TextInput
            input={{
              id: 'region-register-name_input',
              labelName: 'Nom',
              name: 'name',
              placeholder: 'Entrez le nom de la région du corps',
              isRequired: true,
              autoComplete: 'name',
            }}
          />

          <ButtonSection onClose={onClose} />
        </form>
      </div>
    </BaseModal>
  );
}
