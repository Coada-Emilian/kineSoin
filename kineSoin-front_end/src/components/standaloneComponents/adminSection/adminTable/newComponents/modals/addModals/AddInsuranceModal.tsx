/**
 * @component AddInsuranceModal
 *
 * Modal component that displays a form for creating a new insurance organization.
 * It gathers details such as name, AMC code, address, and contact phone number.
 *
 * @param {boolean} isOpen - Indicates whether the modal is open.
 * @param {() => void} onClose - Function to close the modal.
 *
 * @returns {JSX.Element} A modal form wrapped inside `BaseModal` for adding an insurance record.
 *
 * @example
 * <AddInsuranceModal isOpen={modalOpen} onClose={handleClose} />
 *
 * @remarks
 * - Uses `useSubmitInsuranceMutation` to handle the form submission.
 * - Uses the `FormData` API to collect input values.
 * - Country prefixes for the phone number input are retrieved via `usePrefixesContext`.
 * - Displays a loader using `DNALoader` during the mutation process.
 * - Shows error messages if submission fails.
 *
 * @dependencies
 * - `DNALoader` for loading animation.
 * - `BaseModal` for layout.
 * - `CreateButtonsSection` for submission/cancel buttons.
 * - Input components: `StandardTextInputRefactor`, `StandardDropdownInputRefactor`, `StandardTelephoneInputRefactor`.
 */

import { usePrefixesContext } from '../../../../../../../utils/contexts/PrefixesContext';
import DNALoader from '../../../../../../../utils/DNALoader';
import { useSubmitInsuranceMutation } from '../../../../../../../utils/functions/adminSection/adminTable/mutations/modalMutations/insuranceModalMutations/useInsuranceSubmitMutation';
import StandardDropdownInputRefactor from '../../../../../generalComponents/standardInputs/newInputs/StandardDropdownInputRefactor';
import StandardTelephoneInputRefactor from '../../../../../generalComponents/standardInputs/newInputs/StandardTelephoneInputRefactor';
import StandardTextInputRefactor from '../../../../../generalComponents/standardInputs/newInputs/StandardTextInputRefactor';
import BaseModal from '../../../../../privateSection/therapistSection/modals/BaseModal';
import CreateButtonsSection from '../../pageComponents/CreateButtonsSection';

interface AddInsuranceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddInsuranceModal({
  isOpen,
  onClose,
}: AddInsuranceModalProps) {
  // Get the countries and their prefixes from the context
  const { countries } = usePrefixesContext();

  // Declare the mutation for submitting the insurance
  const handleInsuranceSubmit = useSubmitInsuranceMutation(onClose);

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
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter un organisme d'assurance
        </h2>

        {handleInsuranceSubmit.error && (
          <p className="text-red-500 text-xs text-center">
            {handleInsuranceSubmit.error.message}
          </p>
        )}

        <form className="space-y-4 " onSubmit={handleFormSubmit}>
          <StandardTextInputRefactor
            textInput={{
              id: 'insurance-register-name_input',
              labelName: 'Nom',
              name: 'name',
              placeholder: 'Entrez le nom de l’organisme d’assurance',
              isRequired: true,
              autoComplete: 'name',
            }}
          />

          <StandardTextInputRefactor
            textInput={{
              id: 'insurance-register-licenceCode_input',
              labelName: 'Code AMC',
              name: 'amc_code',
              placeholder: "Entrez le code AMC de l'organisme d'assurance",
              isRequired: true,
              autoComplete: 'amc-code',
            }}
          />

          <div className="flex gap-2 items-center justify-between">
            <StandardTextInputRefactor
              textInput={{
                id: 'insurance-register-streetNumber_input',
                labelName: 'N° de rue',
                name: 'street_number',
                placeholder: 'N° de rue',
                isRequired: true,
                autoComplete: 'street-number',
                additionalDivClassName: 'w-4/12',
              }}
            />

            <StandardTextInputRefactor
              textInput={{
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
            <StandardTextInputRefactor
              textInput={{
                id: 'insurance-register-postalCode_input',
                labelName: 'Code postal',
                name: 'postal_code',
                placeholder: 'Code postal',
                isRequired: true,
                autoComplete: 'postal-code',
                additionalDivClassName: 'w-4/12',
              }}
            />

            <StandardTextInputRefactor
              textInput={{
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
            <StandardDropdownInputRefactor
              dropdownInput={{
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
                id: 'insurance-register-phoneNumber_input',
                additionalDivClassName: 'w-3/4',
                isRequired: true,
                autoComplete: 'phone-number',
                placeholder:
                  "Entrez le numéro de téléphone de l'organisme d'assurance",
              }}
            />
          </div>

          <CreateButtonsSection onClose={onClose} />
        </form>
      </div>
    </BaseModal>
  );
}
