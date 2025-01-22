import DescriptionSection from '../DescriptionSection/DescriptionSection';
import FormSection from '../FormSection/FormSection';
import HeadBand from '../HeadBand/HeadBand';

interface MainProps {
  isHomePageMain?: boolean;
  isPatientLoginPageMain?: boolean;
  isTherapistLoginPageMain?: boolean;
  isPatientRegisterPageMain?: boolean;
  isRegisterPageRendered?: boolean;
  isFirstFormValidated?: boolean;
  isSecondFormValidated?: boolean;
  isThirdFormValidated?: boolean;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  setIsRegisterPageRendered?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFirstFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSecondFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsThirdFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Main({
  isHomePageMain,
  isPatientLoginPageMain,
  isTherapistLoginPageMain,
  isRegisterPageRendered,
  isFirstFormValidated,
  isSecondFormValidated,
  isThirdFormValidated,
  setPatientProfileToken,
  setTherapistProfileToken,
  setIsRegisterPageRendered,
  setIsFirstFormValidated,
  setIsSecondFormValidated,
  setIsThirdFormValidated,
}: MainProps) {
  return (
    <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
      <div className="flex flex-col w-full h-full">
        <>
          <FormSection
            isHomePageFormSection={isHomePageMain ?? false}
            isPatientLoginPageFormSection={isPatientLoginPageMain ?? false}
            isTherapistLoginPageFormSection={isTherapistLoginPageMain ?? false}
            setPatientProfileToken={setPatientProfileToken}
            setTherapistProfileToken={setTherapistProfileToken}
            isRegisterPageRendered={isRegisterPageRendered ?? false}
            isFirstFormValidated={isFirstFormValidated ?? false}
            isSecondFormValidated={isSecondFormValidated ?? false}
            isThirdFormValidated={isThirdFormValidated ?? false}
            setIsRegisterPageRendered={setIsRegisterPageRendered ?? (() => {})}
            setIsFirstFormValidated={setIsFirstFormValidated ?? (() => {})}
            setIsSecondFormValidated={setIsSecondFormValidated ?? (() => {})}
            setIsThirdFormValidated={setIsThirdFormValidated ?? (() => {})}
          />

          <HeadBand />

          <DescriptionSection
            isHomePageDescriptionSection={isHomePageMain ?? false}
            isPatientLoginPageDescriptionSection={
              isPatientLoginPageMain ?? false
            }
            isTherapistLoginPageDescriptionSection={
              isTherapistLoginPageMain ?? false
            }
            isPatientRegisterFirstFormPageDescriptionSection={
              isRegisterPageRendered ?? false
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
        </>
      </div>
    </main>
  );
}
