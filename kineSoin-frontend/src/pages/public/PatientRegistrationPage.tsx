import PatientRegistrationDescriptionSection from '../../components/pages/public/PatientRegistrationPage/PatientRegistrationDescriptionSection';
import PatientRegistrationFormSection from '../../components/pages/public/PatientRegistrationPage/PatientRegistrationFormSection';
import PublicHeadband from '../../components/pages/public/PublicHeadband';
import { PatientRegistrationContextProvider } from '../../contexts/PatientRegistrationContext/PatientRegistrationContext';

export default function PatientRegistrationPage() {
  return (
    <>
      <PatientRegistrationContextProvider>
        <PatientRegistrationFormSection />

        <PublicHeadband />

        <PatientRegistrationDescriptionSection />
      </PatientRegistrationContextProvider>
    </>
  );
}
