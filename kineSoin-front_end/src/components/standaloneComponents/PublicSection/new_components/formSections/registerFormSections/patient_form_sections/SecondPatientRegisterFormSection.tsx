import { useEffect, useState } from 'react';
import { ICountry } from '../../../../../../../@types/interfaces/customInterfaces';
import { fetchCountriesData } from '../../../../../../../utils/functions/component_utils/common_components/standardInputs/fetchCountriesData';
import StandardDropdownInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardDropdownInputRefactor';
import StandardTelephoneInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardTelephoneInputRefactor';
import StandardTextInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardTextInputRefactor';

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
            id: 'patient-register-streetNumber_input',
            labelName: 'N° de rue',
            name: 'street_number',
            placeholder: 'N° de rue',
            additionalDivClassName: 'w-6/12',
            isRequired: false,
            autoComplete: 'street-number',
          }}
        />

        <StandardTextInputRefactor
          textInput={{
            id: 'patient-register-streetName_input',
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
            id: 'patient-register-postalCode_input',
            labelName: 'Code postal',
            name: 'postal_code',
            placeholder: 'Code postal',
            additionalDivClassName: 'w-6/12',
            isRequired: true,
            autoComplete: 'postal_code',
          }}
        />

        <StandardTextInputRefactor
          textInput={{
            id: 'patient-register-City_input',
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
            id: 'patient-register-prefix_input',
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
            id: 'patient-register-phoneNumber_input',
            isRequired: true,
            autoComplete: 'phone-number',
          }}
        />
      </div>
    </>
  );
}
