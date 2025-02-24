import StandardEmailInput from '../../../../generalComponents/StandardInputs/StandardEmailInput';
import StandardFileInput from '../../../../generalComponents/StandardInputs/standardFileInput/StandardFileInput';
import StandardPasswordInput from '../../../../generalComponents/StandardInputs/StandardPasswordInput';

interface ThirdPatientRegisterFormSectionProps {
  setPatientImage: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function ThirdPatientRegisterFormSection({
  setPatientImage,
}: ThirdPatientRegisterFormSectionProps) {
  return (
    <>
      <StandardFileInput
        isPatientRegisterImageInput
        setPatientImage={setPatientImage}
      />

      <StandardEmailInput
        emailInput={{ inputId: 'patient-register-email_input' }}
      />

      <StandardPasswordInput
        passwordInput={{
          inputId: 'patient-register-password_input',
          inputName: 'password',
          inputPlaceholder: 'Entrez votre mot de passe',
          labelContent: 'Mot de passe',
          autoComplete: 'password',
        }}
      />
      <StandardPasswordInput
        passwordInput={{
          inputId: 'patient-register-confirm-password_input',
          inputName: 'confirm-password',
          inputPlaceholder: 'Confirmez le mot de passe',
          labelContent: 'Confirmation mot de passe',
          autoComplete: 'repeated-password',
        }}
      />
    </>
  );
}
