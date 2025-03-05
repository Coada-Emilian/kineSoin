import PublicHeadBand from '../../standaloneComponents/PublicSection/PublicHeadBand';
import PatientLoginFormSection from '../../standaloneComponents/PublicSection/FormSection/PatientLoginFormSection';
import { PatientAuthentificationContextProvider } from '../../../utils/contexts/authentificationContexts/PatientAuthentificationContent';
import PatientLoginDescriptionSection from '../../standaloneComponents/PublicSection/DescriptionSection/PatientLoginDescriptionSection';

export default function PatientLoginMain() {
  return (
    <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
      <div className="flex flex-col w-full h-full">
        <PatientAuthentificationContextProvider>
          <PatientLoginFormSection />

          <PublicHeadBand />

          <PatientLoginDescriptionSection />
        </PatientAuthentificationContextProvider>
      </div>
    </main>
  );
}
