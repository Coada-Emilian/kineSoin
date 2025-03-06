import PublicHeadBand from '../../../standaloneComponents/PublicSection/PublicHeadBand';
import { TherapistAuthentificationContextProvider } from '../../../../utils/contexts/authentificationContexts/TherapistAuthentificationContext';
import TherapistLoginFormSection from '../../../standaloneComponents/PublicSection/new_components/formSections/loginFormSections/TherapistLoginFormSection';
import TherapistLoginDescriptionSection from '../../../standaloneComponents/PublicSection/new_components/descriptionSections/loginDescriptionSections/TherapistLoginDescriptionSection';

export default function TherapistLoginMain() {
  return (
    <>
      <TherapistAuthentificationContextProvider>
        <TherapistLoginFormSection />

        <PublicHeadBand />

        <TherapistLoginDescriptionSection />
      </TherapistAuthentificationContextProvider>
    </>
  );
}
