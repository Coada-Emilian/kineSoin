/**
 * @function AddMedicModal
 *
 * A modal used for adding a new medic (doctor) to the system.
 * It includes input fields for the medic's personal and contact information,
 * and submits the data using a mutation for creating a new medic.
 *
 * @param isOpen - A boolean indicating whether the modal is open or not.
 * @param onClose - A callback function to close the modal.
 *
 * @returns {JSX.Element} - A modal form for adding a medic.
 *
 * @example
 * <AddMedicModal isOpen={isAddMedicModalOpen} onClose={handleCloseMedicModal} />
 *
 * @remarks
 * - The modal is powered by `BaseModal` and integrates multiple input components for capturing medic data.
 * - Form submission triggers a mutation to submit the data for the medic.
 */

import BaseModal from '../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { useGlobalContext } from '../../../../../../../utils/contexts/GlobalContext';
import StandardTextInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardTextInputRefactor';
import StandardDropdownInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardDropdownInputRefactor';
import StandardTelephoneInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardTelephoneInputRefactor';
import { usePrefixesContext } from '../../../../../../../utils/contexts/PrefixesContext';
import CreateButtonsSection from '../../page_components/CreateButtonsSection';
import DNALoader from '../../../../../../../utils/DNALoader';
import { useSubmitMedicMutation } from '../../../../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/modals/mutations/useMedicSubmitMutation';

interface AddMedicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMedicModal({ isOpen, onClose }: AddMedicModalProps) {
  const { countries } = usePrefixesContext();

  const { errorMessage, setError } = useGlobalContext();

  const handleMedicSubmit = useSubmitMedicMutation(onClose, setError);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleMedicSubmit.mutate(new FormData(e.currentTarget));
  };

  if (handleMedicSubmit.isPending) {
    return DNALoader();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter un médecin
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
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

          <div className="flex gap-2 items-center justify-between">
            <StandardDropdownInputRefactor
              dropdownInput={{
                id: 'medic-register-prefix_input',
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
                id: 'medic-register-phoneNumber_input',
                isRequired: true,
                autoComplete: 'phone-number',
                placeholder: 'Entrez le numéro de téléphone du médecin',
              }}
            />
          </div>

          <CreateButtonsSection onClose={onClose} />
        </form>
      </div>
    </BaseModal>
  );
}
