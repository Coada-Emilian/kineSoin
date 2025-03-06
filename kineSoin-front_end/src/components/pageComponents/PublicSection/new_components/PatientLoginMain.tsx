import PublicHeadBand from '../../../standaloneComponents/PublicSection/PublicHeadBand';
import PatientLoginFormSection from '../../../standaloneComponents/PublicSection/DescriptionSection/new_components/formSections/PatientLoginFormSection';
import { PatientAuthentificationContextProvider } from '../../../../utils/contexts/authentificationContexts/PatientAuthentificationContent';
import PatientLoginDescriptionSection from '../../../standaloneComponents/PublicSection/DescriptionSection/new_components/descriptionSections/PatientLoginDescriptionSection';

export default function PatientLoginMain() {
  return (
    <>
      <PatientAuthentificationContextProvider>
        <PatientLoginFormSection />

        <PublicHeadBand />

        <PatientLoginDescriptionSection />
      </PatientAuthentificationContextProvider>
    </>
  );
}
