import PublicMain from '../../standaloneComponents/PublicSection/PublicMain/PublicMain';

interface RegisterPageProps {
  isFirstFormValidated?: boolean;
  isSecondFormValidated?: boolean;
  isThirdFormValidated?: boolean;
  setIsFirstFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSecondFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsThirdFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  isGlobalFormSubmitted?: boolean;
  setIsGlobalFormSubmitted?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegisterPageMain({
  isFirstFormValidated,
  isSecondFormValidated,
  isThirdFormValidated,
  setIsFirstFormValidated,
  setIsSecondFormValidated,
  setIsThirdFormValidated,
  isGlobalFormSubmitted,
  setIsGlobalFormSubmitted,
}: RegisterPageProps) {
  return (
    <>
      <PublicMain
        isPatientRegisterPageMain
        isFirstFormValidated={isFirstFormValidated}
        isSecondFormValidated={isSecondFormValidated}
        isThirdFormValidated={isThirdFormValidated}
        setIsFirstFormValidated={setIsFirstFormValidated}
        setIsSecondFormValidated={setIsSecondFormValidated}
        setIsThirdFormValidated={setIsThirdFormValidated}
        isGlobalFormSubmitted={isGlobalFormSubmitted}
        setIsGlobalFormSubmitted={setIsGlobalFormSubmitted}
      />
    </>
  );
}
