import type { GetFormElementFunctionProps } from '../../../../@types/props/functionProps';
import FirstPatientRegisterFormSection from '../../../../components/pages/public/patientRegistration/forms/FirstPatientRegistrationFormSection';
import PatientRegistrationConfirmationFormSection from '../../../../components/pages/public/patientRegistration/forms/PatientRegistrationConfirmationFormSection';
import SecondPatientRegisterFormSection from '../../../../components/pages/public/patientRegistration/forms/SecondPatientRegistrationFormSection';
import ThirdPatientRegisterFormSection from '../../../../components/pages/public/patientRegistration/forms/ThirdPatientRegistrationFormSection';

export const getFormElement = ({
  formOrder,
  setPatientImage,
}: GetFormElementFunctionProps) => {
  switch (formOrder) {
    case 'first':
      return <FirstPatientRegisterFormSection />;
    case 'second':
      return <SecondPatientRegisterFormSection />;
    case 'third':
      return (
        <ThirdPatientRegisterFormSection setPatientImage={setPatientImage} />
      );
    case 'last':
      return <PatientRegistrationConfirmationFormSection />;
  }
};
