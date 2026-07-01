import PublicHeadband from '../../components/pages/public/common/PublicHeadband';
import PatientLoginDescriptionSection from '../../components/pages/public/patientLogin/PatientLoginDescriptionSection';
import PatientLoginFormSection from '../../components/pages/public/patientLogin/PatientLoginFormSection';

export default function PatientLoginPage() {
  return (
    <>
      <PatientLoginFormSection />

      <PublicHeadband />

      <PatientLoginDescriptionSection />
    </>
  );
}
