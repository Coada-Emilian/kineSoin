import StandardChoiceDropdown from '../../../../../../generalComponents/StandardInputs/standardDropdownInput/StandardDropdownInput';
import StandardEmailInput from '../../../../../../generalComponents/StandardInputs/StandardEmailInput';
import StandardPasswordInput from '../../../../../../generalComponents/StandardInputs/StandardPasswordInput';

export default function ThirdAddTherapistModal() {
  return (
    <>
      <StandardEmailInput emailInput={{
        inputId: 'admin-therapist-email_input',
        inputPlaceholder: 'E-mail du kinésithérapeute',
      }} />

      <StandardPasswordInput isAdminTherapistAddPasswordInput />

      <StandardPasswordInput isAdminTherapistAddRepeatedPasswordInput />

      <StandardChoiceDropdown isAdminTherapistAddStatusInput />
    </>
  );
}
