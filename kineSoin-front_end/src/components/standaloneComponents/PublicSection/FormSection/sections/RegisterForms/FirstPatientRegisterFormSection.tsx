import StandardDateInput from '../../../../generalComponents/StandardInputs/StandardDateInput';
import StandardTextInput from '../../../../generalComponents/StandardInputs/standardTextFields/StandardTextInput';
import StandardDropdownInput from '../../../../generalComponents/StandardInputs/standardDropdownInput/StandardDropdownInput';

export default function FirstPatientRegisterFormSection() {
  return (
    <>
      <StandardTextInput patientRegister={{ isNameInput: true }} />

      <StandardTextInput patientRegister={{ isBirthNameInput: true }} />

      <StandardTextInput patientRegister={{ isSurnameInput: true }} />

      <StandardDateInput isPatientRegisterBirthdateInput />

      <StandardDropdownInput isGenderDropdownInput />
    </>
  );
}
