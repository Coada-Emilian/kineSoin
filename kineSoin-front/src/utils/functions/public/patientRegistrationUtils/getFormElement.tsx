import type { GetFormElementFunctionProps } from '../../../../@types/interfaces/customProps';
import FirstPatientRegisterFormSection from '../../../../components/pages/publicSection/PatientRegistrationPage/forms/FirstPatientRegistrationFormSection';
import SecondPatientRegisterFormSection from '../../../../components/pages/publicSection/PatientRegistrationPage/forms/SecondPatientRegistrationFormSection';
import ThirdPatientRegisterFormSection from '../../../../components/pages/publicSection/PatientRegistrationPage/forms/ThirdPatientRegistrationFormSection';
import PatientRegistrationConfirmationFormSection from '../../../../components/pages/publicSection/PatientRegistrationPage/PatientRegistrationConfirmationFormSection';

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
