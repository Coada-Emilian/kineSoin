import StandardEmailInput from '../../../generalComponents/StandardInputs/StandardEmailInput';
import StandardPasswordInput from '../../../generalComponents/StandardInputs/StandardPasswordInput';

export default function TherapistLoginFormSection() {
  return (
    <>
      <StandardEmailInput
        emailInput={{ inputId: 'therapist-login-email_input' }}
      />

      <StandardPasswordInput
        passwordInput={{
          inputId: 'therapist-login-password_input',
          inputName: 'password',
          inputPlaceholder: 'Entrez votre mot de passe',
          labelContent: 'Mot de passe',
          autoComplete: 'current-password',
        }}
      />
    </>
  );
}
