import Footer from '../standaloneComponents/Footer/Footer';
import Main from '../standaloneComponents/Main/Main';
import MobileNav from '../standaloneComponents/MobileNav/MobileNav';
import NavBar from '../standaloneComponents/NavBar/NavBar';

interface HomepageProps {
  windowWidth: number;
}

export default function Homepage({ windowWidth }: HomepageProps) {
  return (
    <>
      <NavBar windowWidth={windowWidth} isPublicNavBar />
      <Main isHomePageMain />
      <Footer isPublicFooter />
      {windowWidth < 768 && <MobileNav isPublicMobileNav />}
    </>
  );
}
