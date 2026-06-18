import HomePageDescriptionSection from '../../components/pages/public/HomePage/HomePageDescriptionSection';
import HomePageFormSection from '../../components/pages/public/HomePage/HomePageFormSection';
import PublicHeadband from '../../components/pages/public/PublicHeadband';

export default function HomePage() {
  return (
    <>
      <HomePageFormSection />

      <PublicHeadband />

      <HomePageDescriptionSection />
    </>
  );
}
