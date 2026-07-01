import PublicHeadband from '../../components/pages/public/common/PublicHeadband';
import TherapistLoginDescriptionSection from '../../components/pages/public/therapistLogin/TherapistLoginDescriptionSection';
import TherapistLoginFormSection from '../../components/pages/public/therapistLogin/TherapistLoginFormSection';

export default function TherapistLoginPage() {
  return (
    <>
      <TherapistLoginFormSection />

      <PublicHeadband />

      <TherapistLoginDescriptionSection />
    </>
  );
}
