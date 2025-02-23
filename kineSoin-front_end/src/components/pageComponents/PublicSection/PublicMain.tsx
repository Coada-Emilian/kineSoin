import { useEffect, useState } from 'react';
import PublicMainFormSection from '../../standaloneComponents/PublicSection/PublicMainFormSection';
import PublicHeadBand from '../../standaloneComponents/PublicSection/PublicHeadBand';
import PublicMainDescriptionSection from '../../standaloneComponents/PublicSection/PublicMainDescriptionSection/PublicMainDescriptionSection';

interface PublicMainProps {
  isHomePageMain?: boolean;

  isPatientLoginPageMain?: boolean;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;

  isTherapistLoginPageMain?: boolean;
  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  isPatientRegisterPageMain?: boolean;
  isFirstFormValidated?: boolean;
  isSecondFormValidated?: boolean;
  isThirdFormValidated?: boolean;
  isGlobalFormSubmitted?: boolean;
  setIsFirstFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSecondFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsThirdFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGlobalFormSubmitted?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PublicMain({
  isHomePageMain,

  isPatientLoginPageMain,
  setPatientProfileToken,

  isTherapistLoginPageMain,
  setTherapistProfileToken,

  isPatientRegisterPageMain,
  isFirstFormValidated,
  isSecondFormValidated,
  isThirdFormValidated,
  isGlobalFormSubmitted,
  setIsFirstFormValidated,
  setIsSecondFormValidated,
  setIsThirdFormValidated,
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

  const formSectionProps = {
    isHomePageFormSection: isHomePageMain ?? false,

    isPatientLoginPageFormSection: isPatientLoginPageMain ?? false,
    setPatientProfileToken: isPatientLoginPageMain
      ? setPatientProfileToken
      : undefined,

    isTherapistLoginPageFormSection: isTherapistLoginPageMain ?? false,
    setTherapistProfileToken: isTherapistLoginPageMain
      ? setTherapistProfileToken
      : undefined,

    isPatientRegisterPageRendered:
      isPatientRegisterPageMain && isPatientRegisterPageRendered,
    setIsPatientRegisterPageRendered: isPatientRegisterPageMain
      ? setIsPatientRegisterPageRendered
      : undefined,
    isFirstFormValidated: isPatientRegisterPageMain
      ? (isFirstFormValidated ?? false)
      : false,
    isSecondFormValidated: isPatientRegisterPageMain
      ? (isSecondFormValidated ?? false)
      : false,
    isThirdFormValidated: isPatientRegisterPageMain
      ? (isThirdFormValidated ?? false)
      : false,
    setIsFirstFormValidated: isPatientRegisterPageMain
      ? (setIsFirstFormValidated ?? (() => {}))
      : () => {},
    setIsSecondFormValidated: isPatientRegisterPageMain
      ? (setIsSecondFormValidated ?? (() => {}))
      : () => {},
    setIsThirdFormValidated: isPatientRegisterPageMain
      ? (setIsThirdFormValidated ?? (() => {}))
      : () => {},
    isGlobalFormSubmitted: isPatientRegisterPageMain
      ? isGlobalFormSubmitted
      : false,
    setIsGlobalFormSubmitted: isPatientRegisterPageMain
      ? setIsGlobalFormSubmitted
      : undefined,
  };

  const mainDescriptionProps = {
    isHomePageDescriptionSection: isHomePageMain ?? false,

    isPatientLoginPageDescriptionSection: isPatientLoginPageMain ?? false,

    isTherapistLoginPageDescriptionSection: isTherapistLoginPageMain ?? false,
    
    isPatientRegisterFirstFormPageDescriptionSection:
      isPatientRegisterPageMain ?? false,
    isPatientRegisterSecondFormPageDescriptionSection:
      isFirstFormValidated ?? false,
    isPatientRegisterThirdFormPageDescriptionSection:
      isSecondFormValidated ?? false,
    isPatientConfirmationPageDescriptionSection: isThirdFormValidated ?? false,
  };
  return (
    <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
      <div className="flex flex-col w-full h-full">
        <PublicMainFormSection {...formSectionProps} />

        <PublicHeadBand />

        <PublicMainDescriptionSection {...mainDescriptionProps} />
      </div>
    </main>
  );
}
