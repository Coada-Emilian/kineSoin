import PublicHeadBand from '../../standaloneComponents/PublicSection/PublicHeadBand';
import { TherapistAuthentificationContextProvider } from '../../../utils/contexts/authentificationContexts/TherapistAuthentificationContext';
import TherapistLoginFormSection from '../../standaloneComponents/PublicSection/FormSection/TherapistLoginFormSection';
import TherapistLoginDescriptionSection from '../../standaloneComponents/PublicSection/DescriptionSection/TherapistLoginDescriptionSection';

export default function TherapistLoginMain() {
  return (
    <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
      <div className="flex flex-col w-full h-full">
        <TherapistAuthentificationContextProvider>
          <TherapistLoginFormSection />

          <PublicHeadBand />

          <TherapistLoginDescriptionSection />
        </TherapistAuthentificationContextProvider>
      </div>
    </main>
  );
}
