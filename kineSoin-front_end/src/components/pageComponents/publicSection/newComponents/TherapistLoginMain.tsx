import PublicHeadBand from '../../../standaloneComponents/publicSection/PublicHeadBand';
import TherapistLoginDescriptionSection from '../../../standaloneComponents/publicSection/newComponents/descriptionSection/TherapistLoginDescriptionSection';
import TherapistLoginFormSection from '../../../standaloneComponents/publicSection/newComponents/formSection/loginFormSection/TherapistLoginFormSection';

export default function TherapistLoginMain() {
  return (
    <>
      <TherapistLoginFormSection />

      <PublicHeadBand />

      <TherapistLoginDescriptionSection />
    </>
  );
}
