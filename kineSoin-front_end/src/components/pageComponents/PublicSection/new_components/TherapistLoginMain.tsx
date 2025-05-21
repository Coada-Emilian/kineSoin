import PublicHeadBand from '../../../standaloneComponents/PublicSection/PublicHeadBand';
import TherapistLoginDescriptionSection from '../../../standaloneComponents/PublicSection/new_components/descriptionSections/loginDescriptionSections/TherapistLoginDescriptionSection';
import TherapistLoginFormSection from '../../../standaloneComponents/PublicSection/new_components/formSections/loginFormSections/TherapistLoginFormSection';

export default function TherapistLoginMain() {
  return (
    <>
      <TherapistLoginFormSection />

      <PublicHeadBand />

      <TherapistLoginDescriptionSection />
    </>
  );
}
