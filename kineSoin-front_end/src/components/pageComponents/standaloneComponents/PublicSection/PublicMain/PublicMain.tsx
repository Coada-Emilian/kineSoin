import DescriptionSection from '../../DescriptionSection/DescriptionSection';
import FormSection from '../../FormSection/FormSection';
import HeadBand from '../../PrivateMain/PublicHeadBand/PublicHeadBand';

interface MainProps {
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
}: MainProps) {
  return (
    <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
      <div className="flex flex-col w-full h-full">
        <>
          <FormSection
            isHomePageFormSection={isHomePageMain ?? false}
            isPatientLoginPageFormSection={isPatientLoginPageMain ?? false}
            isTherapistLoginPageFormSection={isTherapistLoginPageMain ?? false}
            setPatientProfileToken={
              isPatientLoginPageMain ? setPatientProfileToken : undefined
            }
            setTherapistProfileToken={
              isTherapistLoginPageMain ? setTherapistProfileToken : undefined
            }
            isPatientRegisterPageFormSection={
              isPatientRegisterPageMain ?? false
            }
            isFirstFormValidated={
              isPatientRegisterPageMain ? isFirstFormValidated ?? false : false
            }
            isSecondFormValidated={
              isPatientRegisterPageMain ? isSecondFormValidated ?? false : false
            }
            isThirdFormValidated={
              isPatientRegisterPageMain ? isThirdFormValidated ?? false : false
            }
            setIsFirstFormValidated={
              isPatientRegisterPageMain && setIsFirstFormValidated
                ? setIsFirstFormValidated
                : () => {}
            }
            setIsSecondFormValidated={
              isPatientRegisterPageMain && setIsSecondFormValidated
                ? setIsSecondFormValidated
                : () => {}
            }
            setIsThirdFormValidated={
              isPatientRegisterPageMain && setIsThirdFormValidated
                ? setIsThirdFormValidated
                : () => {}
            }
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
              isPatientRegisterPageMain ?? false
            }
          />
        </>
      </div>
    </main>
  );
}
