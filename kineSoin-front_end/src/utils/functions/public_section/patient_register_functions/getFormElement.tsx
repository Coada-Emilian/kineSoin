import { IFormOrders } from '../../../../@types/types/componentTypes';
import ConfirmationFormSection from '../../../../components/standaloneComponents/PublicSection/new_components/formSections/registerFormSections/ConfirmationFormSection';
import FirstPatientRegisterFormSection from '../../../../components/standaloneComponents/PublicSection/new_components/formSections/registerFormSections/patient_form_sections/FirstPatientRegisterFormSection';
import SecondPatientRegisterFormSection from '../../../../components/standaloneComponents/PublicSection/new_components/formSections/registerFormSections/patient_form_sections/SecondPatientRegisterFormSection';
import ThirdPatientRegisterFormSection from '../../../../components/standaloneComponents/PublicSection/new_components/formSections/registerFormSections/patient_form_sections/ThirdPatientRegisterFormSection';

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
