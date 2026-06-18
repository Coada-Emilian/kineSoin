import PublicHeadband from '../../components/pages/public/PublicHeadband';
import TherapistLoginDescriptionSection from '../../components/pages/public/TherapistLoginPage/TherapistLoginDescriptionSection';
import TherapistLoginFormSection from '../../components/pages/public/TherapistLoginPage/TherapistLoginFormSection';

export default function TherapistLoginPage() {
  return (
    <>
      <TherapistLoginFormSection />

      <PublicHeadband />

      <TherapistLoginDescriptionSection />
    </>
  );
}
