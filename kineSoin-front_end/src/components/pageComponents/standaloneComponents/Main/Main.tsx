import DescriptionSection from '../DescriptionSection/DescriptionSection';
import FormSection from '../FormSection/FormSection';
import HeadBand from '../HeadBand/HeadBand';

interface MainProps {
  isHomePageMain?: boolean;
  isPatientLoginPageMain?: boolean;
  isTherapistLoginPageMain?: boolean;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  isPatientRegisterPageMain?: boolean;
  setIsRegisterPageRendered?: React.Dispatch<React.SetStateAction<boolean>>;
  isRegisterPageRendered?: boolean;
  isFirstFormValidated?: boolean;
  setIsFirstFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  isSecondFormValidated?: boolean;
  setIsSecondFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  isThirdFormValidated?: boolean;
  setIsThirdFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Main({
  isHomePageMain,
  isPatientLoginPageMain,
  isTherapistLoginPageMain,
  setPatientProfileToken,
  setTherapistProfileToken,
  setIsRegisterPageRendered,
  isRegisterPageRendered,
  isFirstFormValidated,
  setIsFirstFormValidated,
  isSecondFormValidated,
  setIsSecondFormValidated,
  isThirdFormValidated,
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
          />
        </>
      </div>
    </main>
  );
}
