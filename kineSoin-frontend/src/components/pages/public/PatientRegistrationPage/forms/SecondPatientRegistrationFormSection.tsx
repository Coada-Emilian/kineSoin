import type { ICountryPrefix } from '../../../../../@types/interfaces/apiInterfaces';
import { useAppContext } from '../../../../../utils/functions/contextUtils/useAppContext';
import DropdownInput from '../../../../ui/inputs/DropdownInput';
import TelephoneInput from '../../../../ui/inputs/TelephoneInput';
import TextInput from '../../../../ui/inputs/TextInput';

export default function SecondPatientRegisterFormSection() {
  const { countryPrefixes } = useAppContext();

  return (
    <>
      <div className="flex gap-2 items-center justify-between">
        <TextInput
          input={{
            id: 'patient-register-streetNumber_input',
            labelName: 'N° de rue',
            name: 'street_number',
            placeholder: 'N° de rue',
            additionalDivClassName: 'w-4/12',
            isRequired: false,
            autoComplete: 'street-number',
          }}
        />

        <TextInput
          input={{
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
        <TextInput
          input={{
            id: 'patient-register-postalCode_input',
            labelName: 'Code postal',
            name: 'postal_code',
            placeholder: 'Code postal',
            additionalDivClassName: 'w-4/12',
            isRequired: true,
            autoComplete: 'postal_code',
          }}
        />

        <TextInput
          input={{
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
        <DropdownInput
          input={{
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
                ...countryPrefixes.map((country: ICountryPrefix) => ({
                  key: country.name,
                  value: country.prefix,
                  text: `${country.name} ${country.prefix}`,
                })),
              ],
            },
          }}
        />

        <TelephoneInput
          input={{
            id: 'patient-register-phoneNumber_input',
            isRequired: true,
            autoComplete: 'phone-number',
          }}
        />
      </div>
    </>
  );
}
