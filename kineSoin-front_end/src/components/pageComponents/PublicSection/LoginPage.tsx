import Footer from '../standaloneComponents/Footer/Footer';
import Main from '../standaloneComponents/Main/Main';
import MobileNav from '../standaloneComponents/MobileNav/MobileNav';
import NavBar from '../standaloneComponents/NavBar/NavBar';

interface LoginPageProps {
  isPatientLoginPage?: boolean;
  windowWidth: number;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
  isTherapistLoginPage?: boolean;
  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

export default function LoginPage({
  isPatientLoginPage,
  windowWidth,
  setPatientProfileToken,
  isTherapistLoginPage,
  setTherapistProfileToken,
}: LoginPageProps) {
  return (
    <>
      <NavBar windowWidth={windowWidth} isPublicNavBar />
      {isPatientLoginPage ? (
        <Main isPatientLoginPageMain />
      ) : isTherapistLoginPage ? (
        <Main isTherapistLoginPageMain />
      ) : null}
      <Footer isPublicFooter />
      {windowWidth < 768 && <MobileNav isPublicMobileNav />}
    </>
  );
}
