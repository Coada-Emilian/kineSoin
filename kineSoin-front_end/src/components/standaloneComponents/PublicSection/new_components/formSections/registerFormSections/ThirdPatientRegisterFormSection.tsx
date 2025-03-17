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
          id: 'patient-register-image_input',
          labelName: 'Chargez votre photo',
          name: 'photo',
          isRequired: true,
        }}
        setPatientImage={setPatientImage}
      />

      <StandardEmailInputRefactor
        emailInput={{
          id: 'patient-register-email_input',
          placeholder: 'Entrez votre adresse e-mail',
          name: 'email',
          autoComplete: 'email',
          labelName: 'E-mail',
        }}
      />

      <StandardPasswordInputRefactor
        passwordInput={{
          id: 'patient-register-password_input',
          name: 'password',
          labelName: 'Mot de passe',
          placeholder: 'Entrez votre mot de passe',
          autoComplete: 'password',
        }}
      />

      <StandardPasswordInputRefactor
        passwordInput={{
          id: 'patient-register-confirmPassword_input',
          name: 'confirm-password',
          labelName: 'Confirmez votre mot de passe',
          placeholder: 'Confirmez votre mot de passe',
          autoComplete: 'confirm-password',
        }}
      />
    </>
  );
}
