import StandardTextInput from '../../../generalComponents/StandardInputs/standardTextFields/StandardTextInput';
import StandardDropdownInput from '../../../../standaloneComponents/generalComponents/StandardInputs/standardDropdownInput/StandardDropdownInput';
import StandardTelephoneInput from '../../../generalComponents/StandardInputs/StandardTelephoneInput';

export default function SecondPatientRegisterFormSection() {
  return (
    <>
      <div className="flex gap-2 items-center justify-between">
        <StandardTextInput patientRegister={{ isStreetNumberInput: true }} />

        <StandardTextInput patientRegister={{ isStreetNameInput: true }} />
      </div>

      <div className="flex gap-2 items-center justify-between">
        <StandardTextInput patientRegister={{ isPostalCodeInput: true }} />

        <StandardTextInput patientRegister={{ isCityInput: true }} />
      </div>

      <div className="flex gap-2 items-center justify-between">
        <StandardDropdownInput isCountryDropdownInput />

        <StandardTelephoneInput isPatientTelephoneInput />
      </div>
    </>
  );
}
