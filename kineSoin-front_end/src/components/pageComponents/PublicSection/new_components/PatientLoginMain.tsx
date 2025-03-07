import PublicHeadBand from '../../../standaloneComponents/PublicSection/PublicHeadBand';
import { PatientAuthentificationContextProvider } from '../../../../utils/contexts/authentificationContexts/PatientAuthentificationContent';
import PatientLoginDescriptionSection from '../../../standaloneComponents/PublicSection/new_components/descriptionSections/loginDescriptionSections/PatientLoginDescriptionSection';
import PatientLoginFormSection from '../../../standaloneComponents/PublicSection/new_components/formSections/loginFormSections/PatientLoginFormSection';

export default function PatientLoginMain() {
  return (
    <>
      <PatientLoginFormSection />

      <PublicHeadBand />

      <PatientLoginDescriptionSection />
    </>
  );
}
