import { useState } from 'react';
import type { FirstAddTherapistModalProps } from '../../../../../@types/props/modalProps';
import { handleAddTherapistStepOneSubmit } from '../../../../../utils/functions/admin/addTherapist/handleAddTherapistStepOneSubmit';
import { useAdminAddTherapistContext } from '../../../../../utils/functions/contextUtils/useAdminAddTherapistContext';
import { useAppContext } from '../../../../../utils/functions/contextUtils/useAppContext';
import PhotoInput from '../../../inputs/PhotoInput';
import TextInput from '../../../inputs/TextInput';
import BaseModal from '../../BaseModal';
import ButtonSection from '../ButtonSection';

export default function FirstAddTherapistModal({
  isOpen,
  onClose,
  setIsAddTherapistModalP2Open,
}: FirstAddTherapistModalProps) {
  const [therapistImage, setTherapistImage] = useState<File | null>(null);

  const { errorMessage, setError } = useAppContext();

  const { setAddForm } = useAdminAddTherapistContext();

  function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    handleAddTherapistStepOneSubmit(e, {
      therapistImage,
      setError,
      setAddForm,
      setIsAddTherapistModalP1Open: onClose,
      setIsAddTherapistModalP2Open: setIsAddTherapistModalP2Open,
    });
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} variant="compact" size="sm">
      <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-2 md:p-4">
        <h2 className="text-xl md:text-2xl font-semibold text-center text-primaryBlue italic mb-4">
          Ajouter un thérapeute
        </h2>

        <p className="text-center text-sm text-gray-500 mb-2">
          Créez un nouvel espace thérapeute
        </p>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-center text-red-600 text-sm">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          <TextInput
            input={{
              id: 'therapist-register-name_input',
              labelName: 'Nom',
              name: 'name',
              placeholder: 'Entrez le nom du kiné',
              isRequired: true,
              autoComplete: 'name',
            }}
          />

          <TextInput
            input={{
              id: 'therapist-register-surname_input',
              labelName: 'Prénom',
              name: 'surname',
              placeholder: 'Entrez le prénom du kiné',
              isRequired: true,
              autoComplete: 'surname',
            }}
          />

          <TextInput
            input={{
              id: 'therapist-register-licenceCode_input',
              labelName: 'Code ADELI',
              name: 'licence_code',
              placeholder: 'Entrez le code ADELI du kiné',
              isRequired: true,
              autoComplete: 'licence_code',
            }}
          />

          <PhotoInput
            input={{
              id: 'therapist-register-image_input',
              labelName: 'Ajouter une photo',
              name: 'photo',
              isRequired: true,
            }}
            setTherapistImage={setTherapistImage}
          />

          <p className="text-sm text-center text-primaryBlue font-medium mt-2">
            Étape 1 / 3 : Informations personnelles
          </p>

          <div className="flex justify-center">
            <ButtonSection
              onClose={onClose}
              setIsAddTherapistModalP2Open={setIsAddTherapistModalP2Open}
            />
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
