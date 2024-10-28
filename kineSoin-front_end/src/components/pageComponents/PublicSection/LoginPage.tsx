
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
  isPatientRegisterPage?: boolean;
}

export default function LoginPage({
  isPatientLoginPage,
  windowWidth,
  setPatientProfileToken,
  isTherapistLoginPage,
  setTherapistProfileToken,
  isPatientRegisterPage,
}: LoginPageProps) {
  return (
    <>
      <NavBar windowWidth={windowWidth} isPublicNavBar />
      <Main
        isPatientLoginPageMain={isPatientLoginPage ?? false}
        isTherapistLoginPageMain={isTherapistLoginPage ?? false}
        isPatientRegisterPageMain={isPatientRegisterPage ?? false}
        setPatientProfileToken={setPatientProfileToken}
        setTherapistProfileToken={setTherapistProfileToken}
      />
      <Footer isPublicFooter />
      {windowWidth < 768 && <MobileNav isPublicMobileNav />}
    </>
  );
}
