import PublicHeadBand from '../../standaloneComponents/PublicSection/PublicHeadBand';
import { PatientRegisterContextProvider } from '../../../utils/contexts/PatientRegisterContext';
import PatientRegisterFormSection from '../../standaloneComponents/PublicSection/FormSection/PatientRegisterFormSection';
import PatientRegisterDescriptionSection from '../../standaloneComponents/PublicSection/DescriptionSection/PatientRegisterDescriptionSection';

export default function PatientRegisterMain() {
  return (
    <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
      <div className="flex flex-col w-full h-full">
        <PatientRegisterContextProvider>
          <PatientRegisterFormSection />

          <PublicHeadBand />

          <PatientRegisterDescriptionSection formOrder="first" />
        </PatientRegisterContextProvider>
      </div>
    </main>
  );
}
