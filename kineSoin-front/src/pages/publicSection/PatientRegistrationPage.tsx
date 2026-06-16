import PatientRegistrationFormSection from '../../components/pages/publicSection/PatientRegistrationPage/PatientRegistrationFormSection';
import PublicHeadband from '../../components/pages/publicSection/PublicHeadband';
import { PatientRegistrationContextProvider } from '../../utils/contexts/PatientRegistrationContext/PatientRegistrationContext';

export default function PatientRegistrationPage() {
  return (
    <>
      <PatientRegistrationContextProvider>
        <PatientRegistrationFormSection />
        <PublicHeadband />
      </PatientRegistrationContextProvider>
    </>
  );
}
