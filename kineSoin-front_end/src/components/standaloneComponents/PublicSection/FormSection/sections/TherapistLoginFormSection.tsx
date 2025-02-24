import StandardEmailInput from '../../../generalComponents/StandardInputs/StandardEmailInput';
import StandardPasswordInput from '../../../generalComponents/StandardInputs/StandardPasswordInput';

export default function TherapistLoginFormSection() {
  return (
    <>
      <StandardEmailInput
        emailInput={{ inputId: 'therapist-login-email_input' }}
      />

      <StandardPasswordInput isTherapistLoginPagePasswordInput />
    </>
  );
}
