import CustomButton from '../../../../../../generalComponents/CustomButton/CustomButton';
import StandardChoiceDropdown from '../../../../../../generalComponents/StandardInputs/old_inputs/StandardDropdownInput';
import StandardTelephoneInput from '../../../../../../generalComponents/StandardInputs/old_inputs/StandardTelephoneInput';
import StandardTextInput from '../../../../../../generalComponents/StandardInputs/old_inputs/StandardTextInput';
import BaseModal from '../../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { handleInsuranceSubmit } from '../utils/dataSubmitFunctions';
import { useGlobalContext } from '../../../../../../../../utils/contexts/GlobalContext';
import StandardTextInputRefactor from '../../../../../../generalComponents/StandardInputs/new_inputs/StandardTextInputRefactor';
import StandardDropdownInputRefactor from '../../../../../../generalComponents/StandardInputs/new_inputs/StandardDropdownInputRefactor';
import StandardTelephoneInputRefactor from '../../../../../../generalComponents/StandardInputs/new_inputs/StandardTelephoneInputRefactor';
import { usePrefixesContext } from '../../../../../../../../utils/contexts/PrefixesContext';
import CustomBtn from '../../../../../../generalComponents/CustomButton/CustomButtonRefactor';
import CreateButtonsSection from '../../../../new_components/CreateButtonsSection';

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
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter un organisme d'assurance
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
        )}

        <form
          className="space-y-4 "
          onSubmit={(e) =>
            handleInsuranceSubmit(e, {
              setError,
              setIsAddInsuranceModalOpen: onClose,
            })
          }
        >
          <StandardTextInputRefactor
            textInput={{
              inputId: 'insurance-register-name_input',
              labelName: 'Nom',
              inputName: 'name',
              inputPlaceholder: 'Entrez le nom de l’organisme d’assurance',
              isRequired: true,
              autoComplete: 'name',
            }}
          />

          <StandardTextInputRefactor
            textInput={{
              inputId: 'insurance-register-licenceCode_input',
              labelName: 'Code AMC',
              inputName: 'name',
              inputPlaceholder: "Entrez le code AMC de l'organisme d'assurance",
              isRequired: true,
              autoComplete: 'amc-code',
            }}
          />

          <div className="flex gap-2 items-center justify-between">
            <StandardTextInputRefactor
              textInput={{
                inputId: 'insurance-register-streetNumber_input',
                labelName: 'N° de rue',
                inputName: 'street_number',
                inputPlaceholder: 'N° de rue',
                isRequired: true,
                autoComplete: 'street-number',
                additionalDivClassName: 'w-4/12',
              }}
            />

            <StandardTextInputRefactor
              textInput={{
                inputId: 'insurance-register-streetName_input',
                labelName: 'Nom de rue',
                inputName: 'street_name',
                inputPlaceholder: 'Nom de rue',
                isRequired: true,
                autoComplete: 'street-name',
              }}
            />
          </div>

          <div className="flex gap-2 items-center justify-between">
            <StandardTextInputRefactor
              textInput={{
                inputId: 'insurance-register-postalCode_input',
                labelName: 'Code postal',
                inputName: 'postal_code',
                inputPlaceholder: 'Code postal',
                isRequired: true,
                autoComplete: 'postal-code',
                additionalDivClassName: 'w-4/12',
              }}
            />

            <StandardTextInputRefactor
              textInput={{
                inputId: 'insurance-register-city_input',
                labelName: 'Ville',
                inputName: 'city',
                inputPlaceholder: 'Ville',
                isRequired: true,
                autoComplete: 'city',
              }}
            />
          </div>

          <div className="flex gap-2 items-center justify-between">
            <StandardDropdownInputRefactor
              dropdownInput={{
                inputId: 'insurance-register-prefix_input',
                labelName: 'Préfixe',
                additionalDivClassName: 'w-4/12',
                inputName: 'prefix',
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
                inputId: 'insurance-register-phoneNumber_input',
                isRequired: true,
                autoComplete: 'phone-number',
                inputPlaceholder:
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
