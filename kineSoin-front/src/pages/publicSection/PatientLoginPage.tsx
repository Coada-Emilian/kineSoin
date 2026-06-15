import PatientLoginDescriptionSection from '../../components/pages/publicSection/PatientLoginPage/PatientLoginDescriptionSection';
import PatientLoginFormSection from '../../components/pages/publicSection/PatientLoginPage/PatientLoginFormSection';
import PublicHeadband from '../../components/pages/publicSection/PublicHeadband';

export default function PatientLoginPage() {
  return (
    <>
      <PatientLoginFormSection />

      <PublicHeadband />

      <PatientLoginDescriptionSection />
    </>
  );
}
