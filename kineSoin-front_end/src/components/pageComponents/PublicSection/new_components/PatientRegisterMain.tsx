import { PatientRegisterContextProvider } from '../../../../utils/contexts/PatientRegisterContext';
import PatientRegisterDescriptionSection from '../../../standaloneComponents/PublicSection/new_components/descriptionSections/PatientRegisterDescriptionSection';
import PatientRegisterFormSection from '../../../standaloneComponents/PublicSection/new_components/formSections/registerFormSections/PatientRegisterFormSection';
import PublicHeadBand from '../../../standaloneComponents/PublicSection/PublicHeadBand';

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
