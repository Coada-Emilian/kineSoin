import type { SecondAddTherapistModalProps } from '../../../../../@types/props/modalProps';
import { handleAddTherapistStepTwoSubmit } from '../../../../../utils/functions/admin/addTherapist/handleAddTherapistStepTwoSubmit';
import { useAdminAddTherapistContext } from '../../../../../utils/functions/contextUtils/useAdminAddTherapistContext';
import { useAppContext } from '../../../../../utils/functions/contextUtils/useAppContext';
import DropdownInput from '../../../inputs/DropdownInput';
import TelephoneInput from '../../../inputs/TelephoneInput';
import TextInput from '../../../inputs/TextInput';
import BaseModal from '../../BaseModal';
import ButtonSection from './ButtonSection';

export default function SecondAddTherapistModal({
  isOpen,
  onClose,
  setIsAddTherapistModalP3Open,
}: SecondAddTherapistModalProps) {
  const { countryPrefixes, errorMessage, setError } = useAppContext();

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

          <div className="flex gap-2 items-center justify-between w-full">
            <DropdownInput
              input={{
                id: 'therapist-register-prefix_input',
                labelName: 'Préfixe',
                additionalDivClassName: 'w-1/4',
                name: 'prefix',
                autoComplete: 'prefix',
                isRequired: true,
                allOptions: {
                  startingOption: {
                    value: '',
                    text: 'Préfixe',
                  },
                  options: [
                    ...countryPrefixes.map((country) => ({
                      key: country.name,
                      value: country.prefix,
                      text: `${country.name} ${country.prefix}`,
                    })),
                  ],
                },
              }}
            />

            <TelephoneInput
              input={{
                id: 'therapist-register-phoneNumber_input',
                isRequired: true,
                additionalDivClassName: 'w-3/4',
                autoComplete: 'phone-number',
                placeholder: 'Entrez le numéro de téléphone du kiné',
              }}
            />
          </div>

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

          <p className="text-red-500 text-center text-xs md:text-sm italic">
            Etape 2 / 3 : Études et expérience
          </p>

          <ButtonSection onClose={onClose} />
        </form>
      </div>
    </BaseModal>
  );
}
