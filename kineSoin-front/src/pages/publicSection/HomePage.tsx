import HomePageDescriptionSection from '../../components/pages/publicSection/HomePage/HomePageDescriptionSection';
import HomePageFormSection from '../../components/pages/publicSection/HomePage/HomePageFormSection';
import PublicHeadband from '../../components/pages/publicSection/PublicHeadband';

export default function HomePage() {
  return (
    <>
      <HomePageFormSection />

      <PublicHeadband />

      <HomePageDescriptionSection />
    </>
  );
}
