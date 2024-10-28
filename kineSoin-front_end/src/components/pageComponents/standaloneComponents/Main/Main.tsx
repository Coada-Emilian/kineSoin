import { useState } from 'react';
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
}

export default function Main({
  isHomePageMain,
  isPatientLoginPageMain,
  isTherapistLoginPageMain,
  setPatientProfileToken,
  setTherapistProfileToken,
  isPatientRegisterPageMain,
}: MainProps) {
  const [isFirstFormValidated, setIsFirstFormValidated] =
    useState<boolean>(false);
  const [isSecondFormValidated, setIsSecondFormValidated] =
    useState<boolean>(false);
  const [isThirdFormValidated, setIsThirdFormValidated] =
    useState<boolean>(false);
  return (
    <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
      <div className="flex flex-col w-full h-fit">
        <>
          <FormSection
            isHomePageFormSection={isHomePageMain ?? false}
            isPatientLoginPageFormSection={isPatientLoginPageMain ?? false}
            isTherapistLoginPageFormSection={isTherapistLoginPageMain ?? false}
            setPatientProfileToken={setPatientProfileToken}
            setTherapistProfileToken={setTherapistProfileToken}
            isPatientRegisterPageFormSection={
              isPatientRegisterPageMain ?? false
            }
            isPatientRegisterPageSecondFormSection={
              isFirstFormValidated ?? false
            }
            isPatientRegisterPageThirdFormSection={
              isSecondFormValidated ?? false
            }
            isPatientConfirmationSection={isThirdFormValidated ?? false}
            setIsFirstFormValidated={setIsFirstFormValidated}
            setIsSecondFormValidated={setIsSecondFormValidated}
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
