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

      <StandardPasswordInput isPatientRegisterPasswordInput />

      <StandardPasswordInput isPatientRegisterConfirmPasswordInput />
    </>
  );
}
