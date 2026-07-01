import type { BasicModalProps } from '../../../../@types/props/modalProps';
import { useAppContext } from '../../../../utils/functions/contextUtils/useAppContext';
import { useSubmitMedicMutation } from '../../../../utils/hooks/admin/creation/useMedicCreationMutation';
import DNALoader from '../../DNALoader';
import DropdownInput from '../../inputs/DropdownInput';
import EmailInput from '../../inputs/EmailInput';
import TelephoneInput from '../../inputs/TelephoneInput';
import TextInput from '../../inputs/TextInput';
import BaseModal from '../BaseModal';
import ButtonSection from './ButtonSection';

export default function AddMedicModal({ isOpen, onClose }: BasicModalProps) {
  const { countryPrefixes } = useAppContext();

  const handleMedicSubmit = useSubmitMedicMutation(onClose);

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleMedicSubmit.mutate(new FormData(e.currentTarget));
  };

  // If the medic submission is pending, show a loader
  if (handleMedicSubmit.isPending) {
    return DNALoader();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} variant="default" size="md">
      <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-2 md:p-4">
        <h2 className="text-xl md:text-2xl font-semibold text-center text-primaryBlue italic mb-4">
          Ajouter un médecin
        </h2>

        <p className="text-center text-sm text-gray-500 mb-2">
          Créez un nouvel espace médecin
        </p>

        {handleMedicSubmit.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-center text-red-600 text-sm">
              {handleMedicSubmit.error.message}
            </p>
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
          <TextInput
            input={{
              id: 'medic-register-name_input',
              labelName: 'Nom',
              name: 'name',
              placeholder: 'Entrez le nom du médecin',
              isRequired: true,
              autoComplete: 'name',
            }}
          />

          <TextInput
            input={{
              id: 'medic-register-surname_input',
              labelName: 'Prénom',
              name: 'surname',
              placeholder: 'Entrez le prénom du médecin',
              isRequired: true,
              autoComplete: 'surname',
            }}
          />

          <TextInput
            input={{
              id: 'medic-register-licenceCode_input',
              labelName: 'Code ADELI',
              name: 'licence_code',
              placeholder: 'Entrez le code ADELI du médecin',
              isRequired: true,
              autoComplete: 'licence-code',
            }}
          />

          <div className="flex gap-2 items-center justify-between">
            <TextInput
              input={{
                id: 'medic-register-streetNumber_input',
                labelName: 'N° de rue',
                name: 'street_number',
                placeholder: 'N° de rue du médecin',
                autoComplete: 'street_number',
                additionalDivClassName: 'w-4/12',
              }}
            />

            <TextInput
              input={{
                id: 'medic-register-streetName_input',
                labelName: 'Nom de rue',
                name: 'street_name',
                placeholder: 'Nom de rue du médecin',
                isRequired: true,
                autoComplete: 'street_name',
              }}
            />
          </div>

          <div className="flex gap-2 items-center justify-between">
            <TextInput
              input={{
                id: 'medic-register-postalCode_input',
                labelName: 'Code postal',
                name: 'postal_code',
                placeholder: 'Code postal du médecin',
                isRequired: true,
                autoComplete: 'postal_code',
                additionalDivClassName: 'w-4/12',
              }}
            />

            <TextInput
              input={{
                id: 'medic-register-city_input',
                labelName: 'Ville',
                name: 'city',
                placeholder: 'Ville du médecin',
                isRequired: true,
                autoComplete: 'city',
              }}
            />
          </div>

          <div className="flex gap-2 items-center justify-between w-full">
            <DropdownInput
              input={{
                id: 'medic-register-prefix_input',
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
                id: 'medic-register-phoneNumber_input',
                isRequired: true,
                autoComplete: 'phone-number',
                placeholder: 'Entrez le numéro de téléphone du médecin',
                additionalDivClassName: 'w-3/4',
              }}
            />
          </div>

          <EmailInput
            input={{
              id: 'medic-register-email_input',
              isRequired: true,
              labelName: 'E-mail',
              autoComplete: 'email',
              name: 'email',
              placeholder: "Entrez l'adresse email du médecin",
              additionalDivClassName: 'w-3/4',
            }}
          />

          <div className="flex justify-center">
            <ButtonSection onClose={onClose} />
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
