/**
 * @component SecondAddTherapistModal
 *
 * This modal component handles the second step in adding a new therapist.
 * It collects details about the therapist's education, experience, and contact information.
 *
 * @param {boolean} isOpen - Controls whether the modal is visible.
 * @param {() => void} onClose - Function to close the modal.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsAddTherapistModalP3Open - Function to open the third step modal.
 *
 * @returns {JSX.Element} - The second step modal component for adding a therapist.
 *
 * @example
 * <SecondAddTherapistModal isOpen={isOpen} onClose={onClose} setIsAddTherapistModalP3Open={setStep3Open} />
 *
 * @remarks
 * - Uses `useGlobalContext` to manage error messages.
 * - Uses `useAdminAddTherapistFormGlobalContext` to update form state.
 * - Calls `addSecondFormDetails` on form submission to validate and proceed.
 * - Includes input fields for diploma, experience, specialty, and description.
 * - Uses `StandardDropdownInputRefactor` for country prefix selection.
 * - Uses `StandardTelephoneInputRefactor` for phone number input.
 */

import { useAdminAddTherapistFormGlobalContext } from '../../../../../../../utils/contexts/AdminAddTherapistFormGlobalContext';
import { useGlobalContext } from '../../../../../../../utils/contexts/GlobalContext';
import { usePrefixesContext } from '../../../../../../../utils/contexts/PrefixesContext';
import { addSecondFormDetails } from '../../../../../../../utils/functions/component_utils/page_components/admin_table/add_therapist_form_details';
import CustomBtn from '../../../../../generalComponents/CustomButton/CustomButtonRefactor';
import StandardDropdownInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardDropdownInputRefactor';
import StandardTelephoneInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardTelephoneInputRefactor';
import StandardTextInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardTextInputRefactor';
import BaseModal from '../../../../../PrivateSection/TherapistSection/Modals/BaseModal';

interface SecondAddTherapistModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsAddTherapistModalP3Open: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SecondAddTherapistModal({
  isOpen,
  onClose,
  setIsAddTherapistModalP3Open,
}: SecondAddTherapistModalProps) {
  // Get the country prefixes
  const { countries } = usePrefixesContext();

  // Get the global context values
  const { errorMessage, setError } = useGlobalContext();

  // Get the admin add therapist form
  const { setAddForm } = useAdminAddTherapistFormGlobalContext();

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter un thérapeute
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
        )}

        <form
          className="space-y-4 "
          onSubmit={(e) =>
            addSecondFormDetails(e, {
              setError,
              setAddForm,
              setIsAddTherapistModalP2Open: onClose,
              setIsAddTherapistModalP3Open: setIsAddTherapistModalP3Open,
            })
          }
        >
          <StandardTextInputRefactor
            textInput={{
              id: 'therapist-register-diploma_input',
              labelName: 'Diplôme',
              name: 'diploma',
              placeholder: 'Entrez le diplôme du kiné',
              isRequired: true,
              autoComplete: 'diploma',
            }}
          />

          <StandardTextInputRefactor
            textInput={{
              id: 'therapist-register-experience_input',
              labelName: 'Expérience',
              name: 'experience',
              placeholder: "Entrez l'expérience du kiné",
              isRequired: true,
              autoComplete: 'experience',
            }}
          />

          <StandardTextInputRefactor
            textInput={{
              id: 'therapist-register-specialty_input',
              labelName: 'Spécialité',
              name: 'specialty',
              placeholder: 'Entrez la spécialité du kiné',
              isRequired: true,
              autoComplete: 'specialty',
            }}
          />

          <div className="flex gap-2 items-center justify-between">
            <StandardDropdownInputRefactor
              dropdownInput={{
                id: 'therapist-register-prefix_input',
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
                id: 'therapist-register-phoneNumber_input',
                isRequired: true,
                autoComplete: 'phone-number',
                placeholder: 'Entrez le numéro de téléphone du kiné',
              }}
            />
          </div>

          <StandardTextInputRefactor
            textInput={{
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

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomBtn
              btn={{
                type: 'basic',
                text: 'Suivant',
                style: 'normal',
              }}
              type="submit"
            />

            <CustomBtn
              btn={{
                type: 'cancel',
                text: 'Annuler',
                style: 'normal',
                onClick: () => {
                  onClose && onClose();
                },
              }}
            />
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
