import StandardDateInput from '../../../../generalComponents/StandardInputs/StandardDateInput';
import StandardTextInput from '../../../../generalComponents/StandardInputs/StandardTextInput';
import StandardDropdownInput from '../../../../generalComponents/StandardInputs/StandardDropdownInput';

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
