import { useState } from 'react';
import Footer from '../standaloneComponents/Footer/Footer';
import Main from '../standaloneComponents/Main/Main';
import MobileNav from '../standaloneComponents/MobileNav/MobileNav';
import NavBar from '../standaloneComponents/NavBar/NavBar';

interface LoginPageProps {
  isPatientLoginPage?: boolean;
  windowWidth: number;
  isTherapistLoginPage?: boolean;
  isPatientRegisterPage?: boolean;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

export default function LoginPage({
  isPatientLoginPage,
  windowWidth,
  isTherapistLoginPage,
  isPatientRegisterPage,
  setPatientProfileToken,
  setTherapistProfileToken,
}: LoginPageProps) {
  const [isRegisterPageRendered, setIsRegisterPageRendered] = useState<boolean>(
    isPatientRegisterPage ? true : false
  );
  const [isFirstFormValidated, setIsFirstFormValidated] =
    useState<boolean>(false);
  const [isSecondFormValidated, setIsSecondFormValidated] =
    useState<boolean>(false);
  const [isThirdFormValidated, setIsThirdFormValidated] =
    useState<boolean>(false);

  return (
    <>
      <NavBar
        windowWidth={windowWidth}
        isPublicNavBar
        setIsRegisterPageRendered={setIsRegisterPageRendered}
        setIsFirstFormValidated={setIsFirstFormValidated}
        setIsSecondFormValidated={setIsSecondFormValidated}
        setIsThirdFormValidated={setIsThirdFormValidated}
      />

      <Main
        isPatientLoginPageMain={isPatientLoginPage ?? false}
        isTherapistLoginPageMain={isTherapistLoginPage ?? false}
        isPatientRegisterPageMain={isPatientRegisterPage ?? false}
        setPatientProfileToken={setPatientProfileToken}
        setTherapistProfileToken={setTherapistProfileToken}
        setIsRegisterPageRendered={setIsRegisterPageRendered}
        isRegisterPageRendered={isRegisterPageRendered}
        isFirstFormValidated={isFirstFormValidated}
        setIsFirstFormValidated={setIsFirstFormValidated}
        isSecondFormValidated={isSecondFormValidated}
        setIsSecondFormValidated={setIsSecondFormValidated}
        isThirdFormValidated={isThirdFormValidated}
        setIsThirdFormValidated={setIsThirdFormValidated}
      />

      <Footer isPublicFooter />

      {windowWidth < 768 && <MobileNav isPublicMobileNav />}
    </>
  );
}
