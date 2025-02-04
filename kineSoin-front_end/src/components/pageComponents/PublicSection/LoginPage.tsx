import { useEffect, useState } from 'react';
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
  setIsRegisterPageRendered?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFirstFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSecondFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsThirdFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  isFirstFormValidated?: boolean;
  isSecondFormValidated?: boolean;
  isThirdFormValidated?: boolean;
  isRegisterPageRendered?: boolean;
}

export default function LoginPage({
  isPatientLoginPage,
  windowWidth,
  isTherapistLoginPage,
  isPatientRegisterPage,
  setPatientProfileToken,
  setTherapistProfileToken,
  setIsRegisterPageRendered,
  setIsFirstFormValidated,
  setIsSecondFormValidated,
  setIsThirdFormValidated,
  isFirstFormValidated,
  isSecondFormValidated,
  isThirdFormValidated,
  isRegisterPageRendered,
}: LoginPageProps) {
  useEffect(() => {
    if (setIsRegisterPageRendered) {
      setIsRegisterPageRendered(isPatientRegisterPage ? true : false);
    }
  }, [isPatientRegisterPage]);

  return (
    <>
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
    </>
  );
}
