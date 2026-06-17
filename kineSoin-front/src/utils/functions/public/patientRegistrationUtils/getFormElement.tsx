import type { GetFormElementFunctionProps } from '../../../../@types/props/customProps';
import FirstPatientRegisterFormSection from '../../../../components/pages/publicSection/PatientRegistrationPage/forms/FirstPatientRegistrationFormSection';
import PatientRegistrationConfirmationFormSection from '../../../../components/pages/publicSection/PatientRegistrationPage/forms/PatientRegistrationConfirmationFormSection';
import SecondPatientRegisterFormSection from '../../../../components/pages/publicSection/PatientRegistrationPage/forms/SecondPatientRegistrationFormSection';
import ThirdPatientRegisterFormSection from '../../../../components/pages/publicSection/PatientRegistrationPage/forms/ThirdPatientRegistrationFormSection';

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
