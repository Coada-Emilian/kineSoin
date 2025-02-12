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
  const getInputId = () => {
    if (isPatientLoginPageEmailInput) return 'patient-connexion-email_input';
    if (isTherapistLoginPageEmailInput)
      return 'therapist-connexion-email_input';
    if (isPatientRegisterEmailInput) return 'patient-register-email_input';
    if (isAdminEmailInput) return 'admin-email_input';
    if (isAdminTherapistAddEmailInput) return 'admin-therapist-email_input';
    return '';
  };

  const inputId = getInputId();
  const placeholder = isAdminTherapistAddEmailInput
    ? 'E-mail du kinésithérapeute'
    : 'Entrez votre e-mail';

  return (
    <div className="mb-4 italic">
      <label htmlFor={inputId} className="text-primaryBlue text-sm font-medium">
        E-mail
      </label>
      <input
        type="email"
        name="email"
        id={inputId}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
