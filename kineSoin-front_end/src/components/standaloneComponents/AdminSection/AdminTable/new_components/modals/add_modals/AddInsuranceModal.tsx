/**
 * @function AddInsuranceModal
 *
 * A modal used for adding a new insurance organization to the system.
 * It includes input fields for the insurance's name, license code, address, and contact details,
 * and submits the data using a mutation for creating a new insurance entity.
 *
 * @param isOpen - A boolean indicating whether the modal is open or not.
 * @param onClose - A callback function to close the modal.
 *
 * @returns {JSX.Element} - A modal form for adding an insurance organization.
 *
 * @example
 * <AddInsuranceModal isOpen={isAddInsuranceModalOpen} onClose={handleCloseInsuranceModal} />
 *
 * @remarks
 * - The modal is powered by `BaseModal` and integrates multiple input components for capturing insurance data.
 * - Form submission triggers a mutation to submit the data for the insurance organization.
 */

import BaseModal from '../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { useGlobalContext } from '../../../../../../../utils/contexts/GlobalContext';
import StandardTextInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardTextInputRefactor';
import StandardDropdownInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardDropdownInputRefactor';
import StandardTelephoneInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardTelephoneInputRefactor';
import { usePrefixesContext } from '../../../../../../../utils/contexts/PrefixesContext';
import CreateButtonsSection from '../../page_components/CreateButtonsSection';
import DNALoader from '../../../../../../../utils/DNALoader';
import { useSubmitInsuranceMutation } from '../../../../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/modals/mutations/useInsuranceSubmitMutation';

interface AddInsuranceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddInsuranceModal({
  isOpen,
  onClose,
}: AddInsuranceModalProps) {
  const { errorMessage, setError } = useGlobalContext();
  const { countries } = usePrefixesContext();

  const handleInsuranceSubmit = useSubmitInsuranceMutation(onClose, setError);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleInsuranceSubmit.mutate(new FormData(e.currentTarget));
  };

  if (handleInsuranceSubmit.isPending) {
    return DNALoader();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter un organisme d'assurance
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
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
              name: 'name',
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

          <div className="flex gap-2 items-center justify-between">
            <StandardDropdownInputRefactor
              dropdownInput={{
                id: 'insurance-register-prefix_input',
                labelName: 'Préfixe',
                additionalDivClassName: 'w-4/12',
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
