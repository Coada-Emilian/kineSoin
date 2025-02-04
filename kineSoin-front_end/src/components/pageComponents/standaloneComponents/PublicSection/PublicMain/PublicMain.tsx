import { useEffect, useState } from 'react';
import PublicMainDescriptionSection from '../PublicMainDescriptionSection/PublicMainDescriptionSection';
import PublicMainFormSection from '../PublicMainFormSection/PublicMainFormSection';
import PublicHeadBand from '../../PrivateMain/PublicHeadBand/PublicHeadBand';

interface PublicMainProps {
  isHomePageMain?: boolean;
  isPatientLoginPageMain?: boolean;
  isTherapistLoginPageMain?: boolean;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  isPatientRegisterPageMain?: boolean;
  isFirstFormValidated?: boolean;
  isSecondFormValidated?: boolean;
  isThirdFormValidated?: boolean;
  setIsFirstFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSecondFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsThirdFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  isGlobalFormSubmitted?: boolean;
  setIsGlobalFormSubmitted?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PublicMain({
  isHomePageMain,
  isPatientLoginPageMain,
  isTherapistLoginPageMain,
  setPatientProfileToken,
  setTherapistProfileToken,
  isPatientRegisterPageMain,
  isFirstFormValidated,
  isSecondFormValidated,
  isThirdFormValidated,
  setIsFirstFormValidated,
  setIsSecondFormValidated,
  setIsThirdFormValidated,
  isGlobalFormSubmitted,
  setIsGlobalFormSubmitted,
}: PublicMainProps) {
  // Register page render state
  const [isPatientRegisterPageRendered, setIsPatientRegisterPageRendered] =
    useState(false);

  // UseEffect to set the register page render state
  useEffect(() => {
    if (isPatientRegisterPageMain) {
      setIsPatientRegisterPageRendered(true);
    } else {
      setIsPatientRegisterPageRendered(false);
    }
  }, [isPatientRegisterPageMain]);

  return (
    <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
      <div className="flex flex-col w-full h-full">
        <PublicMainFormSection
          isHomePageFormSection={isHomePageMain ?? false}
          isPatientLoginPageFormSection={isPatientLoginPageMain ?? false}
          isTherapistLoginPageFormSection={isTherapistLoginPageMain ?? false}
          setPatientProfileToken={
            isPatientLoginPageMain ? setPatientProfileToken : undefined
          }
          setTherapistProfileToken={
            isTherapistLoginPageMain ? setTherapistProfileToken : undefined
          }
          isPatientRegisterPageRendered={
            isPatientRegisterPageMain && isPatientRegisterPageRendered
          }
          setIsPatientRegisterPageRendered={
            isPatientRegisterPageMain
              ? setIsPatientRegisterPageRendered
              : undefined
          }
          isFirstFormValidated={
            isPatientRegisterPageMain ? (isFirstFormValidated ?? false) : false
          }
          isSecondFormValidated={
            isPatientRegisterPageMain ? (isSecondFormValidated ?? false) : false
          }
          isThirdFormValidated={
            isPatientRegisterPageMain ? (isThirdFormValidated ?? false) : false
          }
          setIsFirstFormValidated={
            isPatientRegisterPageMain
              ? (setIsFirstFormValidated ?? (() => {}))
              : () => {}
          }
          setIsSecondFormValidated={
            isPatientRegisterPageMain
              ? (setIsSecondFormValidated ?? (() => {}))
              : () => {}
          }
          setIsThirdFormValidated={
            isPatientRegisterPageMain
              ? (setIsThirdFormValidated ?? (() => {}))
              : () => {}
          }
          isGlobalFormSubmitted={
            isPatientRegisterPageMain ? isGlobalFormSubmitted : false
          }
          setIsGlobalFormSubmitted={
            isPatientRegisterPageMain ? setIsGlobalFormSubmitted : undefined
          }
        />

        <PublicHeadBand />

        <PublicMainDescriptionSection
          isHomePageDescriptionSection={isHomePageMain ?? false}
          isPatientLoginPageDescriptionSection={isPatientLoginPageMain ?? false}
          isTherapistLoginPageDescriptionSection={
            isTherapistLoginPageMain ?? false
          }
          isPatientRegisterFirstFormPageDescriptionSection={
            isPatientRegisterPageRendered ?? false
          }
          isPatientRegisterSecondFormPageDescriptionSection={
            isFirstFormValidated ?? false
          }
          isPatientRegisterThirdFormPageDescriptionSection={
            isSecondFormValidated ?? false
          }
          isPatientConfirmationPageDescriptionSection={
            isThirdFormValidated ?? false
          }
        />
      </div>
    </main>
  );
}
