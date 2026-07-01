import { PatientRegisterContextProvider } from '../../../../utils/contexts/PatientRegisterContext';
import PublicHeadBand from '../../../standaloneComponents/publicSection/PublicHeadBand';
import PatientRegisterDescriptionSection from '../../../standaloneComponents/publicSection/newComponents/descriptionSection/loginDescriptionSection/PatientRegisterDescriptionSection';
import PatientRegisterFormSection from '../../../standaloneComponents/publicSection/newComponents/formSection/registerFormSection/patientRegisterFormSections/PatientRegisterFormSection';

export default function PatientRegisterMain() {
  return (
    <>
      <PatientRegisterContextProvider>
        <PatientRegisterFormSection />

        <PublicHeadBand />

        <PatientRegisterDescriptionSection />
      </PatientRegisterContextProvider>
    </>
  );
}
