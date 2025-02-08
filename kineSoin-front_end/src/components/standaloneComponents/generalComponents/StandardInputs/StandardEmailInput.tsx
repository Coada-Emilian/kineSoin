interface StandardEmailInputProps {
  isPatientLoginPageEmailInput?: boolean;
  isTherapistLoginPageEmailInput?: boolean;
  isPatientRegisterEmailInput?: boolean;
  isAdminEmailInput?: boolean;
  isAdminTherapistAddEmailInput?: boolean;
}

export default function StandardEmailInput({
  isPatientLoginPageEmailInput,
  isTherapistLoginPageEmailInput,
  isPatientRegisterEmailInput,
  isAdminEmailInput,
  isAdminTherapistAddEmailInput,
}: StandardEmailInputProps) {
  return (
    <div className="mb-4 italic">
      <label
        htmlFor={`${
          isPatientLoginPageEmailInput
            ? 'patient-connexion-email_input'
            : isTherapistLoginPageEmailInput
              ? 'therapist-connexion-email_input'
              : isPatientRegisterEmailInput
                ? 'patient-register-email_input'
                : isAdminEmailInput
                  ? 'admin-email_input'
                  : isAdminTherapistAddEmailInput
                    ? 'admin-therapist-email_input'
                    : ''
        }`}
        className="text-primaryBlue text-sm font-medium"
      >
        E-mail
      </label>

      <input
        type="email"
        name="email"
        id={`${
          isPatientLoginPageEmailInput
            ? 'patient-connexion-email_input'
            : isTherapistLoginPageEmailInput
              ? 'therapist-connexion-email_input'
              : isPatientRegisterEmailInput
                ? 'patient-register-email_input'
                : isAdminEmailInput
                  ? 'admin-email_input'
                  : isAdminTherapistAddEmailInput
                    ? 'admin-therapist-email_input'
                    : ''
        }`}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50"
        placeholder={`${isAdminTherapistAddEmailInput ? 'E-mail du kinésithérapeute' : 'Entrez votre e-mail'}`}
        required
      />
    </div>
  );
}
