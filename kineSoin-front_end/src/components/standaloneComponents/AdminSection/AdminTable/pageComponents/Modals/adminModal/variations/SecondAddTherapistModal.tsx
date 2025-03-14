import BaseModal from '../../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { addSecondFormDetails } from '../utils/addFormDetailsFunctions';
import { useGlobalContext } from '../../../../../../../../utils/contexts/GlobalContext';
import { useAdminAddTherapistFormGlobalContext } from '../../../../../../../../utils/contexts/AdminAddTherapistFormGlobalContext';
import StandardTextInputRefactor from '../../../../../../generalComponents/StandardInputs/new_inputs/StandardTextInputRefactor';
import StandardDropdownInputRefactor from '../../../../../../generalComponents/StandardInputs/new_inputs/StandardDropdownInputRefactor';
import { useEffect, useState } from 'react';
import { fetchCountriesData } from '../../../../../../../../utils/componentUtils/commonComponents/functions/StandardInputs/fetchCountriesData';
import { ICountry } from '../../../../../../../../@types/customInterfaces';
import StandardTelephoneInputRefactor from '../../../../../../generalComponents/StandardInputs/new_inputs/StandardTelephoneInputRefactor';
import CustomBtn from '../../../../../../generalComponents/CustomButton/CustomButtonRefactor';
import { usePrefixesContext } from '../../../../../../../../utils/contexts/PrefixesContext';

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
  const { countries } = usePrefixesContext();

  const { errorMessage, setError } = useGlobalContext();

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
              inputId: 'therapist-register-diploma_input',
              labelName: 'Diplôme',
              inputName: 'diploma',
              inputPlaceholder: 'Entrez le diplôme du kiné',
              isRequired: true,
              autoComplete: 'diploma',
            }}
          />

          <StandardTextInputRefactor
            textInput={{
              inputId: 'therapist-register-experience_input',
              labelName: 'Expérience',
              inputName: 'experience',
              inputPlaceholder: "Entrez l'expérience du kiné",
              isRequired: true,
              autoComplete: 'experience',
            }}
          />

          <StandardTextInputRefactor
            textInput={{
              inputId: 'therapist-register-specialty_input',
              labelName: 'Spécialité',
              inputName: 'specialty',
              inputPlaceholder: 'Entrez la spécialité du kiné',
              isRequired: true,
              autoComplete: 'specialty',
            }}
          />

          <div className="flex gap-2 items-center justify-between">
            <StandardDropdownInputRefactor
              dropdownInput={{
                inputId: 'therapist-register-prefix_input',
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
                inputId: 'therapist-register-phoneNumber_input',
                isRequired: true,
                autoComplete: 'phone-number',
                inputPlaceholder: 'Entrez le numéro de téléphone du kiné',
              }}
            />
          </div>

          <StandardTextInputRefactor
            textInput={{
              inputId: 'therapist-register-description_input',
              labelName: 'Description',
              inputName: 'description',
              inputPlaceholder: 'Entrez la description du kiné',
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
                type: 'basicBtn',
                text: 'Suivant',
                style: 'normal',
              }}
              type="submit"
            />

            <CustomBtn
              btn={{
                type: 'cancelBtn',
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
