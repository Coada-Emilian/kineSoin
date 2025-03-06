import StandardEmailInput from '../../../../generalComponents/StandardInputs/StandardEmailInput';
import StandardFileInput from '../../../../generalComponents/StandardInputs/standardFileInput/StandardFileInput';
import StandardFileInputRefactor from '../../../../generalComponents/StandardInputs/standardFileInput/StandardFileInputRefactor';
import StandardPasswordInput from '../../../../generalComponents/StandardInputs/StandardPasswordInput';

interface ThirdPatientRegisterFormSectionProps {
  setPatientImage:
    | React.Dispatch<React.SetStateAction<File | null>>
    | undefined;
}

export default function ThirdPatientRegisterFormSection({
  setPatientImage,
}: ThirdPatientRegisterFormSectionProps) {
  return (
    <>
      <StandardFileInputRefactor
        fileInput={{
          inputId: 'patient-register-image_input',
          labelName: 'Chargez votre photo',
          inputName: 'photo',
          isRequired: true,
        }}
        setPatientImage={setPatientImage}
      />

      <StandardEmailInput
        emailInput={{
          inputId: 'patient-register-email_input',
          inputPlaceholder: 'Entrez votre adresse e-mail',
          inputName: 'email',
          autoComplete: 'email',
        }}
      />

      <StandardPasswordInput
        passwordInput={{
          inputId: 'patient-register-password_input',
          inputName: 'password',
          labelName: 'Mot de passe',
          inputPlaceholder: 'Entrez votre mot de passe',
          autoComplete: 'password',
        }}
      />

      <StandardPasswordInput
        passwordInput={{
          inputId: 'patient-login-password_input',
          inputName: 'confirm-password',
          labelName: 'Confirmez votre mot de passe',
          inputPlaceholder: 'Confirmez votre mot de passe',
          autoComplete: 'confirm-password',
        }}
      />
    </>
  );
}
