import BaseModal from '../../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { handleMedicSubmit } from '../utils/dataSubmitFunctions';
import { useGlobalContext } from '../../../../../../../../utils/contexts/GlobalContext';
import StandardTextInputRefactor from '../../../../../../generalComponents/StandardInputs/new_inputs/StandardTextInputRefactor';
import StandardDropdownInputRefactor from '../../../../../../generalComponents/StandardInputs/new_inputs/StandardDropdownInputRefactor';
import StandardTelephoneInputRefactor from '../../../../../../generalComponents/StandardInputs/new_inputs/StandardTelephoneInputRefactor';
import CustomBtn from '../../../../../../generalComponents/CustomButton/CustomButtonRefactor';
import { usePrefixesContext } from '../../../../../../../../utils/contexts/PrefixesContext';
import CreateButtonsSection from '../../../../new_components/CreateButtonsSection';

interface AddMedicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMedicModal({ isOpen, onClose }: AddMedicModalProps) {
  const { countries } = usePrefixesContext();

  const { errorMessage, setError } = useGlobalContext();

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter un médecin
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
        )}

        <form
          className="space-y-4 "
          onSubmit={(e) =>
            handleMedicSubmit(e, {
              setError,
              setIsAddMedicModalOpen: onClose,
            })
          }
        >
          <StandardTextInputRefactor
            textInput={{
              inputId: 'medic-register-name_input',
              labelName: 'Nom',
              inputName: 'name',
              inputPlaceholder: 'Entrez le nom du médecin',
              isRequired: true,
              autoComplete: 'name',
            }}
          />

          <StandardTextInputRefactor
            textInput={{
              inputId: 'medic-register-surname_input',
              labelName: 'Prénom',
              inputName: 'surname',
              inputPlaceholder: 'Entrez le prénom du médecin',
              isRequired: true,
              autoComplete: 'surname',
            }}
          />

          <StandardTextInputRefactor
            textInput={{
              inputId: 'medic-register-licenceCode_input',
              labelName: 'Code ADELI',
              inputName: 'licence_code',
              inputPlaceholder: 'Entrez le code ADELI du médecin',
              isRequired: true,
              autoComplete: 'licence-code',
            }}
          />

          <div className="flex gap-2 items-center justify-between">
            <StandardTextInputRefactor
              textInput={{
                inputId: 'medic-register-streetNumber_input',
                labelName: 'N° de rue',
                inputName: 'street_number',
                inputPlaceholder: 'N° de rue du médecin',
                autoComplete: 'street_number',
                additionalDivClassName: 'w-4/12',
              }}
            />

            <StandardTextInputRefactor
              textInput={{
                inputId: 'medic-register-streetName_input',
                labelName: 'Nom de rue',
                inputName: 'street_name',
                inputPlaceholder: 'Nom de rue du médecin',
                isRequired: true,
                autoComplete: 'street_name',
              }}
            />
          </div>

          <div className="flex gap-2 items-center justify-between">
            <StandardTextInputRefactor
              textInput={{
                inputId: 'medic-register-postalCode_input',
                labelName: 'Code postal',
                inputName: 'postal_code',
                inputPlaceholder: 'Code postal du médecin',
                isRequired: true,
                autoComplete: 'postal_code',
                additionalDivClassName: 'w-4/12',
              }}
            />

            <StandardTextInputRefactor
              textInput={{
                inputId: 'medic-register-city_input',
                labelName: 'Ville',
                inputName: 'city',
                inputPlaceholder: 'Ville du médecin',
                isRequired: true,
                autoComplete: 'city',
              }}
            />
          </div>

          <div className="flex gap-2 items-center justify-between">
            <StandardDropdownInputRefactor
              dropdownInput={{
                inputId: 'medic-register-prefix_input',
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
                inputId: 'medic-register-phoneNumber_input',
                isRequired: true,
                autoComplete: 'phone-number',
                inputPlaceholder: 'Entrez le numéro de téléphone du médecin',
              }}
            />
          </div>

          <CreateButtonsSection onClose={onClose} />
        </form>
      </div>
    </BaseModal>
  );
}
