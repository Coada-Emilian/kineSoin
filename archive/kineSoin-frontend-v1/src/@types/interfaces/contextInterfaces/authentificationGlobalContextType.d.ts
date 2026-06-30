export interface AuthentificationGlobalContextType {
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  adminProfileToken: string | null;
  setAdminProfileToken: React.Dispatch<React.SetStateAction<string | null>>;

  isPatientAuthenticated: boolean;
  setIsPatientAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  patientProfileToken: string | null;
  setPatientProfileToken: React.Dispatch<React.SetStateAction<string | null>>;

  isTherapistAuthenticated: boolean;
  setIsTherapistAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  therapistProfileToken: string | null;
  setTherapistProfileToken: React.Dispatch<React.SetStateAction<string | null>>;
}
