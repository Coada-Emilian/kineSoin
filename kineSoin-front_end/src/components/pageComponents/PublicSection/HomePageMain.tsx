import PublicHeadBand from '../../standaloneComponents/PublicSection/PublicHeadBand';
import HomePageFormSection from '../../standaloneComponents/PublicSection/FormSection/HomePageFormSection';
import HomePageDescriptionSection from '../../standaloneComponents/PublicSection/DescriptionSection/HomePageDescriptionSection';

export default function HomePageMain() {
  return (
    <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
      <div className="flex flex-col w-full h-full">
        <HomePageFormSection />

        <PublicHeadBand />

        <HomePageDescriptionSection />
      </div>
    </main>
  );
}
