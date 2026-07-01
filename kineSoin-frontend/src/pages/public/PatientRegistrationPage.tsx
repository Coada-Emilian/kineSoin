import PublicHeadband from '../../components/pages/public/common/PublicHeadband';
import PatientRegistrationDescriptionSection from '../../components/pages/public/patientRegistration/PatientRegistrationDescriptionSection';
import PatientRegistrationFormSection from '../../components/pages/public/patientRegistration/PatientRegistrationFormSection';
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
