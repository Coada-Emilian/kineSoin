import PublicHeadband from '../../components/pages/publicSection/PublicHeadband';
import TherapistLoginDescriptionSection from '../../components/pages/publicSection/TherapistLoginPage/TherapistLoginDescriptionSection';
import TherapistLoginFormSection from '../../components/pages/publicSection/TherapistLoginPage/TherapistLoginFormSection';

export default function TherapistLoginPage() {
  return (
    <>
      <TherapistLoginFormSection />

      <PublicHeadband />

      <TherapistLoginDescriptionSection />
    </>
  );
}
