import StandardDropdownInput from '../../../../generalComponents/StandardInputs/old_inputs/StandardDropdownInput';
import StandardTelephoneInput from '../../../../generalComponents/StandardInputs/old_inputs/StandardTelephoneInput';
import StandardDropdownInputRefactor from '../../../../generalComponents/StandardInputs/new_inputs/StandardDropdownInputRefactor';
import StandardTextInputRefactor from '../../../../generalComponents/StandardInputs/new_inputs/StandardTextInputRefactor';
import { useEffect, useState } from 'react';
import { ICountry } from '../../../../../../@types/customInterfaces';
import { fetchCountriesData } from '../../../../../../utils/componentUtils/commonComponents/functions/StandardInputs/fetchCountriesData';
import StandardTelephoneInputRefactor from '../../../../generalComponents/StandardInputs/new_inputs/StandardTelephoneInputRefactor';

export default function SecondPatientRegisterFormSection() {
  const [countries, setCountries] = useState<ICountry[]>([]);

  useEffect(() => {
    fetchCountriesData({ setCountries });
  }, []);
  return (
    <>
      <div className="flex gap-2 items-center justify-between">
        <StandardTextInputRefactor
          textInput={{
            inputId: 'patient-register-streetNumber_input',
            labelName: 'N° de rue',
            inputName: 'street_number',
            inputPlaceholder: 'N° de rue',
            additionalDivClassName: 'w-6/12',
            isRequired: false,
            autoComplete: 'street-number',
          }}
        />

        <StandardTextInputRefactor
          textInput={{
            inputId: 'patient-register-streetName_input',
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
            inputId: 'patient-register-postalCode_input',
            labelName: 'Code postal',
            inputName: 'postal_code',
            inputPlaceholder: 'Code postal',
            additionalDivClassName: 'w-6/12',
            isRequired: true,
            autoComplete: 'postal_code',
          }}
        />

        <StandardTextInputRefactor
          textInput={{
            inputId: 'patient-register-City_input',
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
            inputId: 'patient-register-prefix_input',
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
            inputId: 'patient-register-phoneNumber_input',
            isRequired: true,
            autoComplete: 'phone-number',
          }}
        />
      </div>
    </>
  );
}
