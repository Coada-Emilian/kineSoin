import PublicHeadBand from '../../../standaloneComponents/PublicSection/PublicHeadBand';
import { TherapistAuthentificationContextProvider } from '../../../../utils/contexts/authentificationContexts/TherapistAuthentificationContext';
import TherapistLoginFormSection from '../../../standaloneComponents/PublicSection/DescriptionSection/new_components/formSections/TherapistLoginFormSection';
import TherapistLoginDescriptionSection from '../../../standaloneComponents/PublicSection/DescriptionSection/new_components/descriptionSections/TherapistLoginDescriptionSection';

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
