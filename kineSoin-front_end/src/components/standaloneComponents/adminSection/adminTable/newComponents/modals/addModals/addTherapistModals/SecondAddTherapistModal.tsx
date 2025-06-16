import { useAdminAddTherapistFormGlobalContext } from '../../../../../../../../utils/contexts/AdminAddTherapistFormGlobalContext';
import { useGlobalContext } from '../../../../../../../../utils/contexts/GlobalContext';
import { usePrefixesContext } from '../../../../../../../../utils/contexts/PrefixesContext';
import { addSecondFormDetails } from '../../../../../../../../utils/functions/adminSection/adminTable/addTherapistFormDetails';
import CustomBtn from '../../../../../../generalComponents/customButton/newComponents/CustomButtonRefactor';
import StandardDropdownInputRefactor from '../../../../../../generalComponents/standardInputs/newInputs/StandardDropdownInputRefactor';
import StandardTelephoneInputRefactor from '../../../../../../generalComponents/standardInputs/newInputs/StandardTelephoneInputRefactor';
import StandardTextInputRefactor from '../../../../../../generalComponents/standardInputs/newInputs/StandardTextInputRefactor';
import BaseModal from '../../../../../../privateSection/therapistSection/modals/BaseModal';

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

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    addSecondFormDetails(e, {
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

          <div className="flex gap-2 items-center justify-between w-full">
            <StandardDropdownInputRefactor
              dropdownInput={{
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
                additionalDivClassName: 'w-3/4',
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
