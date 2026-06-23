import { useState } from 'react';
import type { FirstAddTherapistModalProps } from '../../../../../@types/props/modalProps';
import { handleAddTherapistStepOneSubmit } from '../../../../../utils/functions/admin/addTherapist/handleAddTherapistStepOneSubmit';
import { useAdminAddTherapistContext } from '../../../../../utils/functions/contextUtils/useAdminAddTherapistContext';
import { useAppContext } from '../../../../../utils/functions/contextUtils/useAppContext';
import PhotoInput from '../../../inputs/PhotoInput';
import TextInput from '../../../inputs/TextInput';
import BaseModal from '../../BaseModal';
import ButtonSection from './ButtonSection';

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
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter un thérapeute
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
        )}

        <form className="space-y-4 " onSubmit={handleFormSubmit}>
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

          <p className="text-red-500 text-center text-xs md:text-sm italic">
            Etape 1 / 3 : Informations personnelles
          </p>

          <ButtonSection onClose={onClose} />
        </form>
      </div>
    </BaseModal>
  );
}
