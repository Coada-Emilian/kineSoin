import Footer from '../standaloneComponents/Footer/Footer';
import MobileNav from '../standaloneComponents/MobileNav/MobileNav';
import NavBar from '../standaloneComponents/NavBar/NavBar';

interface PatientLoginPageProps {
  windowWidth: number;
  setPatientProfileToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function PatientLoginPage({
  windowWidth,
  setPatientProfileToken,
}: PatientLoginPageProps) {
  return (
    <>
      <NavBar windowWidth={windowWidth} isPublicNavBar />
      <Footer isPublicFooter />
      {windowWidth < 768 && <MobileNav isPublicMobileNav />}
    </>
  );
}
