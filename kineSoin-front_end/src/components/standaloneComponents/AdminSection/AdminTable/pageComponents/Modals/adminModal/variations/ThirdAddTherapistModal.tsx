import StandardChoiceDropdown from '../../../../../../generalComponents/StandardInputs/standardDropdownInput/StandardDropdownInput';
import StandardEmailInput from '../../../../../../generalComponents/StandardInputs/StandardEmailInput';
import StandardPasswordInput from '../../../../../../generalComponents/StandardInputs/StandardPasswordInput';

export default function ThirdAddTherapistModal() {
  return (
    <>
      <StandardEmailInput
        emailInput={{
          inputId: 'admin-therapist-email_input',
          inputPlaceholder: 'E-mail du kinésithérapeute',
        }}
      />

      <StandardPasswordInput
        passwordInput={{
          inputId: 'admin-add-therapist-password_input',
          inputName: 'password',
          inputPlaceholder: 'Entrez le mot de passe',
          labelContent: 'Mot de passe',
          autoComplete: 'new-password',
        }}
      />

      <StandardPasswordInput
        passwordInput={{
          inputId: 'admin-add-therapist-repeated-password_input',
          inputName: 'repeated_password',
          inputPlaceholder: 'Confirmez le mot de passe',
          labelContent: 'Confirmer le mot de passe',
          autoComplete: 'repeated-password',
        }}
      />

      <StandardChoiceDropdown isAdminTherapistAddStatusInput />
    </>
  );
}
