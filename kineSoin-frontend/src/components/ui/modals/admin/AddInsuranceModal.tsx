import type { BasicModalProps } from '../../../../@types/props/modalProps';
import { useInsuranceCreationMutation } from '../../../../hooks/admin/creation/useInsuranceCreationMutation';
import { useAppContext } from '../../../../hooks/context/useAppContext';
import DNALoader from '../../DNALoader';
import DropdownInput from '../../inputs/DropdownInput';
import TelephoneInput from '../../inputs/TelephoneInput';
import TextInput from '../../inputs/TextInput';
import BaseModal from '../BaseModal';
import ButtonSection from './ButtonSection';

export default function AddInsuranceModal({
  isOpen,
  onClose,
}: BasicModalProps) {
  // Get the countries and their prefixes from the context
  const { countryPrefixes } = useAppContext();

  // Declare the mutation for submitting the insurance
  const handleInsuranceSubmit = useInsuranceCreationMutation(onClose);

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleInsuranceSubmit.mutate(new FormData(e.currentTarget));
  };

  // If the countries are not loaded or the insurance submission is pending, show a loader
  if (handleInsuranceSubmit.isPending) {
    return DNALoader();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} variant="compact" size="md">
      <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-2 md:p-4">
        <h2 className="text-xl md:text-2xl font-semibold text-center text-primaryBlue italic mb-4">
          Ajouter un organisme d'assurance
        </h2>

        <p className="text-center text-sm text-gray-500 mb-2">
          Créez un nouvel organisme d'assurance
        </p>

        {handleInsuranceSubmit.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-center text-red-600 text-sm">
              {handleInsuranceSubmit.error.message}
            </p>
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
          <TextInput
            input={{
              id: 'insurance-register-name_input',
              labelName: 'Nom',
              name: 'name',
              placeholder: 'Entrez le nom de l’organisme d’assurance',
              isRequired: true,
              autoComplete: 'name',
            }}
          />

          <TextInput
            input={{
              id: 'insurance-register-licenceCode_input',
              labelName: 'Code AMC',
              name: 'amc_code',
              placeholder: "Entrez le code AMC de l'organisme d'assurance",
              isRequired: true,
              autoComplete: 'amc-code',
            }}
          />

          <div className="flex gap-2 items-center justify-between">
            <TextInput
              input={{
                id: 'insurance-register-streetNumber_input',
                labelName: 'N° de rue',
                name: 'street_number',
                placeholder: 'N° de rue',
                isRequired: true,
                autoComplete: 'street-number',
                additionalDivClassName: 'w-4/12',
              }}
            />

            <TextInput
              input={{
                id: 'insurance-register-streetName_input',
                labelName: 'Nom de rue',
                name: 'street_name',
                placeholder: 'Nom de rue',
                isRequired: true,
                autoComplete: 'street-name',
              }}
            />
          </div>

          <div className="flex gap-2 items-center justify-between">
            <TextInput
              input={{
                id: 'insurance-register-postalCode_input',
                labelName: 'Code postal',
                name: 'postal_code',
                placeholder: 'Code postal',
                isRequired: true,
                autoComplete: 'postal-code',
                additionalDivClassName: 'w-4/12',
              }}
            />

            <TextInput
              input={{
                id: 'insurance-register-city_input',
                labelName: 'Ville',
                name: 'city',
                placeholder: 'Ville',
                isRequired: true,
                autoComplete: 'city',
              }}
            />
          </div>

          <div className="flex gap-2 items-center justify-between w-full">
            <DropdownInput
              input={{
                id: 'insurance-register-prefix_input',
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
                  options: countryPrefixes.map((country) => ({
                    key: country.name,
                    value: country.prefix,
                    text: `${country.name} ${country.prefix}`,
                  })),
                },
              }}
            />

            <TelephoneInput
              input={{
                id: 'insurance-register-phoneNumber_input',
                additionalDivClassName: 'w-3/4',
                isRequired: true,
                autoComplete: 'phone-number',
                placeholder:
                  "Entrez le numéro de téléphone de l'organisme d'assurance",
              }}
            />
          </div>

          <div className="flex justify-center">
            <ButtonSection onClose={onClose} />
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
