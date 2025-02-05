interface StandardEmailInputProps {
  isPatientLoginPageEmailInput?: boolean;
  patientLoginEmail?: string;
  isTherapistLoginPageEmailInput?: boolean;
  therapistLoginEmail?: string;
  setPatientLoginEmail?: React.Dispatch<React.SetStateAction<string>>;
  setTherapistLoginEmail?: React.Dispatch<React.SetStateAction<string>>;
  isPatientRegisterEmailInput?: boolean;
  patientRegisterEmail?: string;
  setPatientRegisterEmail?: React.Dispatch<React.SetStateAction<string>>;
  isAdminEmailInput?: boolean;
  setAdminEmail?: React.Dispatch<React.SetStateAction<string>>;
  adminEmail?: string;
}

export default function StandardEmailInput({
  isPatientLoginPageEmailInput,
  patientLoginEmail,
  isTherapistLoginPageEmailInput,
  therapistLoginEmail,
  setPatientLoginEmail,
  setTherapistLoginEmail,
  isPatientRegisterEmailInput,
  patientRegisterEmail,
  setPatientRegisterEmail,
  isAdminEmailInput,
  setAdminEmail,
  adminEmail,
}: StandardEmailInputProps) {
  return (
    <div className="mb-4 italic">
      <label
        htmlFor={`${isPatientLoginPageEmailInput ? 'patient-connexion-email_input' : isTherapistLoginPageEmailInput ? 'therapist-connexion-email_input' : isPatientRegisterEmailInput ? 'patient-register-email_input' : isAdminEmailInput ? 'admin-email_input' : ''}`}
        className="text-primaryBlue text-sm font-medium"
      >
        E-mail
      </label>

      <input
        type="email"
        name="email"
        id={`${isPatientLoginPageEmailInput ? 'patient-connexion-email_input' : isTherapistLoginPageEmailInput ? 'therapist-connexion-email_input' : isPatientRegisterEmailInput ? 'patient-register-email_input' : isAdminEmailInput ? 'admin-email_input' : ''}`}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50"
        placeholder="Entrez votre e-mail"
        required
        value={`${isPatientLoginPageEmailInput ? patientLoginEmail : isTherapistLoginPageEmailInput ? therapistLoginEmail : isPatientRegisterEmailInput ? patientRegisterEmail : isAdminEmailInput ? adminEmail : ''}`}
        onChange={(e) => {
          {
            isPatientLoginPageEmailInput && setPatientLoginEmail
              ? setPatientLoginEmail(e.target.value)
              : isTherapistLoginPageEmailInput && setTherapistLoginEmail
                ? setTherapistLoginEmail(e.target.value)
                : isPatientRegisterEmailInput && setPatientRegisterEmail
                  ? setPatientRegisterEmail(e.target.value)
                  : isAdminEmailInput && setAdminEmail
                    ? setAdminEmail(e.target.value)
                    : null;
          }
        }}
      />
    </div>
  );
}
