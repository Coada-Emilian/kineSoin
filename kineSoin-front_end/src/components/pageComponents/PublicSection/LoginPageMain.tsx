import { ReactNode } from 'react';
import PublicMain from '../../standaloneComponents/PublicSection/PublicMain';

interface LoginPageProps {
  isPatientLoginMain?: boolean;
  isTherapistLoginMain?: boolean;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

export default function LoginPageMain({
  isPatientLoginMain = false,
  isTherapistLoginMain = false,
  setPatientProfileToken,
  setTherapistProfileToken,
}: LoginPageProps): ReactNode {
  return (
    <PublicMain
      isPatientLoginPageMain={isPatientLoginMain}
      isTherapistLoginPageMain={isTherapistLoginMain}
      setPatientProfileToken={
        isPatientLoginMain ? setPatientProfileToken : undefined
      }
      setTherapistProfileToken={
        isTherapistLoginMain ? setTherapistProfileToken : undefined
      }
    />
  );
}
