import type { SecondAddTherapistModalProps } from '../../../../../@types/props/modalProps';
import { useAdminAddTherapistContext } from '../../../../../hooks/context/useAdminAddTherapistContext';
import { useAppContext } from '../../../../../hooks/context/useAppContext';
import { handleAddTherapistStepTwoSubmit } from '../../../../../utils/functions/admin/addTherapist/handleAddTherapistStepTwoSubmit';

import TextInput from '../../../inputs/TextInput';
import BaseModal from '../../BaseModal';
import ButtonSection from '../ButtonSection';

export default function SecondAddTherapistModal({
  isOpen,
  onClose,
  setIsAddTherapistModalP3Open,
}: SecondAddTherapistModalProps) {
  const { errorMessage, setError } = useAppContext();

  const { setAddForm } = useAdminAddTherapistContext();

  function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    handleAddTherapistStepTwoSubmit(e, {
      setError,
      setAddForm,
      setIsAddTherapistModalP2Open: onClose,
      setIsAddTherapistModalP3Open: setIsAddTherapistModalP3Open,
    });
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} variant="compact" size="sm">
      <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-2 md:p-4">
        <h2 className="text-xl md:text-2xl font-semibold text-center text-primaryBlue italic mb-4">
          Ajouter un thérapeute
        </h2>

        <p className="text-center text-sm text-gray-500 mb-2">
          Complétez les informations professionnelles
        </p>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-center text-red-600 text-sm">{errorMessage}</p>
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
          <TextInput
            input={{
              id: 'therapist-register-diploma_input',
              labelName: 'Diplôme',
              name: 'diploma',
              placeholder: 'Entrez le diplôme du kiné',
              isRequired: true,
              autoComplete: 'diploma',
            }}
          />

          <TextInput
            input={{
              id: 'therapist-register-experience_input',
              labelName: 'Expérience',
              name: 'experience',
              placeholder: "Entrez l'expérience du kiné",
              isRequired: true,
              autoComplete: 'experience',
            }}
          />

          <TextInput
            input={{
              id: 'therapist-register-specialty_input',
              labelName: 'Spécialité',
              name: 'specialty',
              placeholder: 'Entrez la spécialité du kiné',
              isRequired: true,
              autoComplete: 'specialty',
            }}
          />

          <TextInput
            input={{
              id: 'therapist-register-description_input',
              labelName: 'Description',
              name: 'description',
              placeholder: 'Entrez la description du kiné',
              isRequired: true,
              autoComplete: 'description',
              isTextArea: true,
            }}
          />

          <p className="text-sm text-center text-primaryBlue font-medium mt-2">
            Étape 2 / 3 : Études et expérience
          </p>

          <div className="flex justify-center">
            <ButtonSection
              onClose={onClose}
              setIsAddTherapistModalP3Open={setIsAddTherapistModalP3Open}
            />
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
