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
      <Main
        isPatientLoginPageMain={isPatientLoginPage ?? false}
        setPatientProfileToken={setPatientProfileToken}
        setTherapistProfileToken={setTherapistProfileToken}
        isTherapistLoginPageMain={isTherapistLoginPage ?? false}
      />
      <Footer isPublicFooter />
      {windowWidth < 768 && <MobileNav isPublicMobileNav />}
    </>
  );
}
