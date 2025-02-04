import PublicMain from '../standaloneComponents/PublicSection/PublicMain/PublicMain';

interface LoginPageProps {
  isPatientLoginMain?: boolean;
  isTherapistLoginMain?: boolean;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

export default function LoginPageMain({
  isPatientLoginMain,
  isTherapistLoginMain,
  setPatientProfileToken,
  setTherapistProfileToken,
}: LoginPageProps) {
  // useEffect(() => {
  //   if (setIsRegisterPageRendered) {
  //     setIsRegisterPageRendered(isPatientRegisterPage ? true : false);
  //   }
  // }, [isPatientRegisterPage]);

  return (
    <>
      <PublicMain
        isPatientLoginPageMain={isPatientLoginMain ?? false}
        isTherapistLoginPageMain={isTherapistLoginMain ?? false}
        setPatientProfileToken={
          isPatientLoginMain ? setPatientProfileToken : undefined
        }
        setTherapistProfileToken={
          isTherapistLoginMain ? setTherapistProfileToken : undefined
        }
      />
    </>
  );
}
