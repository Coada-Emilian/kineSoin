import type { ThirdPatientRegistrationFormSectionProps } from '../../../../../@types/props/customProps';
import EmailInput from '../../../../ui/inputs/EmailInput';
import PasswordInput from '../../../../ui/inputs/PasswordInput';
import PhotoInput from '../../../../ui/inputs/PhotoInput';

export default function ThirdPatientRegisterFormSection({
  setPatientImage,
}: ThirdPatientRegistrationFormSectionProps) {
  return (
    <>
      <PhotoInput
        input={{
          id: 'patient-register-image_input',
          labelName: 'Chargez votre photo',
          name: 'photo',
          isRequired: true,
        }}
        setPatientImage={setPatientImage}
      />

      <EmailInput
        input={{
          id: 'patient-register-email_input',
          placeholder: 'Entrez votre adresse e-mail',
          name: 'email',
          autoComplete: 'email',
          labelName: 'E-mail',
        }}
      />

      <PasswordInput
        input={{
          id: 'patient-register-password_input',
          name: 'password',
          labelName: 'Mot de passe',
          placeholder: 'Entrez votre mot de passe',
          autoComplete: 'password',
          hasInfoIcon: true,
        }}
      />

      <PasswordInput
        input={{
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
