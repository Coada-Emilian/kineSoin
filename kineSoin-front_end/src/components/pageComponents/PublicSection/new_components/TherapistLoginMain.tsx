import PublicHeadBand from '../../../standaloneComponents/PublicSection/PublicHeadBand';
import TherapistLoginFormSection from '../../../standaloneComponents/PublicSection/new_components/formSections/loginFormSections/TherapistLoginFormSection';
import TherapistLoginDescriptionSection from '../../../standaloneComponents/PublicSection/new_components/descriptionSections/loginDescriptionSections/TherapistLoginDescriptionSection';

export default function TherapistLoginMain() {
  return (
    <>
      <TherapistLoginFormSection />

      <PublicHeadBand />

      <TherapistLoginDescriptionSection />
    </>
  );
}
