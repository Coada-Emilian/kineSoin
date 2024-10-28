import { useState } from 'react';
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
