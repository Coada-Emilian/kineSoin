import PublicHeadBand from '../../../standaloneComponents/PublicSection/PublicHeadBand';
import { PatientRegisterContextProvider } from '../../../../utils/contexts/PatientRegisterContext';
import PatientRegisterFormSection from '../../../standaloneComponents/PublicSection/new_components/formSections/registerFormSections/PatientRegisterFormSection';
import PatientRegisterDescriptionSection from '../../../standaloneComponents/PublicSection/new_components/descriptionSections/PatientRegisterDescriptionSection';

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
