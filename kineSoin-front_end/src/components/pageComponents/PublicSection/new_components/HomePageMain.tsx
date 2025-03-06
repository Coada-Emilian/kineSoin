import HomePageDescriptionSection from '../../../standaloneComponents/PublicSection/new_components/descriptionSections/HomePageDescriptionSection';
import HomePageFormSection from '../../../standaloneComponents/PublicSection/new_components/formSections/HomePageFormSection';
import PublicHeadBand from '../../../standaloneComponents/PublicSection/PublicHeadBand';


export default function HomePageMain() {
  return (
    <>
      <HomePageFormSection />

      <PublicHeadBand />

      <HomePageDescriptionSection />
    </>
  );
}
