import PublicHeadband from '../../components/pages/public/common/PublicHeadband';
import HomePageDescriptionSection from '../../components/pages/public/home/HomePageDescriptionSection';
import HomePageFormSection from '../../components/pages/public/home/HomePageFormSection';

export default function HomePage() {
  return (
    <>
      <HomePageFormSection />

      <PublicHeadband />

      <HomePageDescriptionSection />
    </>
  );
}
