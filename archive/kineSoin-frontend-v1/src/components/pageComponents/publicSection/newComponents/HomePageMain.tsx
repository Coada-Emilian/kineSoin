import HomePageDescriptionSection from '../../../standaloneComponents/publicSection/newComponents/descriptionSection/HomePageDescriptionSection';
import HomePageFormSection from '../../../standaloneComponents/publicSection/newComponents/formSection/homePageFormSection/HomePageFormSection';
import PublicHeadBand from '../../../standaloneComponents/publicSection/PublicHeadBand';

export default function HomePageMain() {
  return (
    <>
      <HomePageFormSection />

      <PublicHeadBand />

      <HomePageDescriptionSection />
    </>
  );
}
