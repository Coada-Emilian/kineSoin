import StandardFileInputRefactor from '../../../../generalComponents/StandardInputs/new_inputs/StandardFileInputRefactor';
import StandardEmailInputRefactor from '../../../../generalComponents/StandardInputs/new_inputs/StandardEmailInputRefactor';
import StandardPasswordInputRefactor from '../../../../generalComponents/StandardInputs/new_inputs/StandardPasswordInputRefactor';

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

      <StandardEmailInputRefactor
        emailInput={{
          inputId: 'patient-register-email_input',
          inputPlaceholder: 'Entrez votre adresse e-mail',
          inputName: 'email',
          autoComplete: 'email',
        }}
      />

      <StandardPasswordInputRefactor
        passwordInput={{
          inputId: 'patient-register-password_input',
          inputName: 'password',
          labelName: 'Mot de passe',
          inputPlaceholder: 'Entrez votre mot de passe',
          autoComplete: 'password',
        }}
      />

      <StandardPasswordInputRefactor
        passwordInput={{
          inputId: 'patient-register-confirmPassword_input',
          inputName: 'confirm-password',
          labelName: 'Confirmez votre mot de passe',
          inputPlaceholder: 'Confirmez votre mot de passe',
          autoComplete: 'confirm-password',
        }}
      />
    </>
  );
}
