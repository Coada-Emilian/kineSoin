/**
 * @component AddMedicModal
 *
 * Modal component that displays a form for creating a new médecin (doctor).
 * It collects all necessary personal and contact details, including name, address,
 * ADELI license code, and phone number with country prefix.
 *
 * @param {boolean} isOpen - Boolean that controls whether the modal is displayed.
 * @param {() => void} onClose - Function to close the modal.
 *
 * @returns {JSX.Element} A form modal wrapped inside a `BaseModal` to add a new doctor.
 *
 * @example
 * <AddMedicModal isOpen={modalState} onClose={closeHandler} />
 *
 * @remarks
 * - Uses React Query mutation via `useSubmitMedicMutation` to submit form data.
 * - Uses `FormData` API to serialize form values.
 * - Uses prefix options from `usePrefixesContext` to render international phone inputs.
 * - Displays a loading indicator while submitting.
 * - Shows backend error message if the mutation fails.
 *
 * @dependencies
 * - `DNALoader` for spinner.
 * - `useSubmitMedicMutation` for API mutation logic.
 * - `StandardTextInputRefactor`, `StandardDropdownInputRefactor`, `StandardTelephoneInputRefactor` for inputs.
 * - `CreateButtonsSection` for submission/cancellation buttons.
 */

import { usePrefixesContext } from '../../../../../../../utils/contexts/PrefixesContext';
import DNALoader from '../../../../../../../utils/DNALoader';
import { useSubmitMedicMutation } from '../../../../../../../utils/functions/adminSection/adminTable/mutations/modalMutations/medicModalMutations/useMedicSubmitMutation';
import { StandardEmailInputRefactor } from '../../../../../generalComponents/standardInputs/newInputs';
import StandardDropdownInputRefactor from '../../../../../generalComponents/standardInputs/newInputs/StandardDropdownInputRefactor';
import StandardTelephoneInputRefactor from '../../../../../generalComponents/standardInputs/newInputs/StandardTelephoneInputRefactor';
import StandardTextInputRefactor from '../../../../../generalComponents/standardInputs/newInputs/StandardTextInputRefactor';
import BaseModal from '../../../../../privateSection/therapistSection/modals/BaseModal';
import CreateButtonsSection from '../../pageComponents/CreateButtonsSection';

interface AddMedicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMedicModal({ isOpen, onClose }: AddMedicModalProps) {
  // Get the countries and their prefixes from the context
  const { countries } = usePrefixesContext();

  // Handle the submission of the medic form using a custom mutation
  const handleMedicSubmit = useSubmitMedicMutation(onClose);

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleMedicSubmit.mutate(new FormData(e.currentTarget));
  };

  // If the medic submission is pending, show a loader
  if (handleMedicSubmit.isPending) {
    return DNALoader();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter un médecin
        </h2>

        {handleMedicSubmit.error && (
          <p className="text-red-500 text-xs text-center">
            {handleMedicSubmit.error.message}
          </p>
        )}

        <form className="space-y-4 " onSubmit={handleFormSubmit}>
          <StandardTextInputRefactor
            textInput={{
              id: 'medic-register-name_input',
              labelName: 'Nom',
              name: 'name',
              placeholder: 'Entrez le nom du médecin',
              isRequired: true,
              autoComplete: 'name',
            }}
          />

          <StandardTextInputRefactor
            textInput={{
              id: 'medic-register-surname_input',
              labelName: 'Prénom',
              name: 'surname',
              placeholder: 'Entrez le prénom du médecin',
              isRequired: true,
              autoComplete: 'surname',
            }}
          />

          <StandardTextInputRefactor
            textInput={{
              id: 'medic-register-licenceCode_input',
              labelName: 'Code ADELI',
              name: 'licence_code',
              placeholder: 'Entrez le code ADELI du médecin',
              isRequired: true,
              autoComplete: 'licence-code',
            }}
          />

          <div className="flex gap-2 items-center justify-between">
            <StandardTextInputRefactor
              textInput={{
                id: 'medic-register-streetNumber_input',
                labelName: 'N° de rue',
                name: 'street_number',
                placeholder: 'N° de rue du médecin',
                autoComplete: 'street_number',
                additionalDivClassName: 'w-4/12',
              }}
            />

            <StandardTextInputRefactor
              textInput={{
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
            <StandardTextInputRefactor
              textInput={{
                id: 'medic-register-postalCode_input',
                labelName: 'Code postal',
                name: 'postal_code',
                placeholder: 'Code postal du médecin',
                isRequired: true,
                autoComplete: 'postal_code',
                additionalDivClassName: 'w-4/12',
              }}
            />

            <StandardTextInputRefactor
              textInput={{
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
            <StandardDropdownInputRefactor
              dropdownInput={{
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
                  options: [
                    ...countries.map((country) => ({
                      key: country.name,
                      value: country.prefix,
                      text: `${country.name} ${country.prefix}`,
                    })),
                  ],
                },
              }}
            />

            <StandardTelephoneInputRefactor
              telephoneInput={{
                id: 'medic-register-phoneNumber_input',
                isRequired: true,
                autoComplete: 'phone-number',
                placeholder: 'Entrez le numéro de téléphone du médecin',
                additionalDivClassName: 'w-3/4',
              }}
            />
          </div>

          <StandardEmailInputRefactor
            emailInput={{
              id: 'medic-register-email_input',
              isRequired: true,
              labelName: 'E-mail',
              autoComplete: 'email',
              name: 'email',
              placeholder: "Entrez l'adresse email du médecin",
              additionalDivClassName: 'w-3/4',
            }}
          />

          <CreateButtonsSection onClose={onClose} />
        </form>
      </div>
    </BaseModal>
  );
}
