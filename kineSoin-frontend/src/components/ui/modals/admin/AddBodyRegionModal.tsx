import type { AddBodyRegionModalProps } from '../../../../@types/props/modalProps';
import { useBodyRegionCreationMutation } from '../../../../hooks/admin/creation/useBodyRegionCreationMutation';
import CustomButton from '../../buttons/CustomButton';
import DNALoader from '../../DNALoader';
import TextInput from '../../inputs/TextInput';
import BaseModal from '../BaseModal';

export default function AddBodyRegionModal({
  isOpen,
  onClose,
  setIsRegionModalOpen,
}: AddBodyRegionModalProps) {
  const handleRegionCreation = useBodyRegionCreationMutation(
    onClose,
    setIsRegionModalOpen
  );

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
    <BaseModal isOpen={isOpen} onClose={onClose} variant="compact" size="sm">
      <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-2 md:p-4">
        <h2 className="text-xl md:text-2xl font-semibold text-center text-primaryBlue italic mb-4">
          Ajouter une région
        </h2>

        <p className="text-center text-sm text-gray-500 mb-2">
          Créez une nouvelle région du corps
        </p>

        {handleRegionCreation.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-center text-red-600 text-sm">
              {handleRegionCreation.error.message}
            </p>
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
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

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomButton
              btn={{
                type: 'basic',
                text: 'Créer',
                style: 'normal',
              }}
              type="submit"
            />

            <CustomButton
              btn={{
                type: 'cancel',
                text: 'Annuler',
                style: 'normal',
                onClick: () => {
                  if (onClose) {
                    onClose();
                    setIsRegionModalOpen(true);
                  }
                },
              }}
            />
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
