import { IFormOrders } from '../../../../@types/types/componentTypes';
import ConfirmationFormSection from '../../../../components/standaloneComponents/publicSection/newComponents/formSection/registerFormSection/ConfirmationFormSection';
import FirstPatientRegisterFormSection from '../../../../components/standaloneComponents/publicSection/newComponents/formSection/registerFormSection/patientRegisterFormSections/FirstPatientRegisterFormSection';
import SecondPatientRegisterFormSection from '../../../../components/standaloneComponents/publicSection/newComponents/formSection/registerFormSection/patientRegisterFormSections/SecondPatientRegisterFormSection';
import ThirdPatientRegisterFormSection from '../../../../components/standaloneComponents/publicSection/newComponents/formSection/registerFormSection/patientRegisterFormSections/ThirdPatientRegisterFormSection';

interface FunctionsProps {
  formOrder: IFormOrders;
  setPatientImage?: React.Dispatch<React.SetStateAction<File | null>>;
}

export const getFormElement = ({
  formOrder,
  setPatientImage,
}: FunctionsProps) => {
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
      return <ConfirmationFormSection />;
  }
};
