import PatientLoginDescriptionSection from '../../components/pages/public/PatientLoginPage/PatientLoginDescriptionSection';
import PatientLoginFormSection from '../../components/pages/public/PatientLoginPage/PatientLoginFormSection';
import PublicHeadband from '../../components/pages/public/PublicHeadband';

export default function PatientLoginPage() {
  return (
    <>
      <PatientLoginFormSection />

      <PublicHeadband />

      <PatientLoginDescriptionSection />
    </>
  );
}
