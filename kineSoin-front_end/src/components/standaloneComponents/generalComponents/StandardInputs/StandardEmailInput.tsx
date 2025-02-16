import { useState } from 'react';

interface StandardEmailInputProps {
  isPatientLoginPageEmailInput?: boolean;
  isTherapistLoginPageEmailInput?: boolean;
  isPatientRegisterEmailInput?: boolean;
  isAdminEmailInput?: boolean;
  isAdminTherapistAddEmailInput?: boolean;
  isPatientProfileEmailModification?: boolean;
  patient_email?: string;
}

export default function StandardEmailInput({
  isPatientLoginPageEmailInput,
  isTherapistLoginPageEmailInput,
  isPatientRegisterEmailInput,
  isAdminEmailInput,
  isAdminTherapistAddEmailInput,
  isPatientProfileEmailModification,
  patient_email,
}: StandardEmailInputProps) {
  const getInputId = () => {
    if (isPatientLoginPageEmailInput) return 'patient-connexion-email_input';
    if (isTherapistLoginPageEmailInput)
      return 'therapist-connexion-email_input';
    if (isPatientRegisterEmailInput) return 'patient-register-email_input';
    if (isAdminEmailInput) return 'admin-email_input';
    if (isAdminTherapistAddEmailInput) return 'admin-therapist-email_input';
    if (isPatientProfileEmailModification) return 'patient_email_input';
  };

  const [patientEmail, setPatientEmail] = useState(
    patient_email ? patient_email : ''
  );

  const inputId = getInputId();
  const placeholder = isAdminTherapistAddEmailInput
    ? 'E-mail du kinésithérapeute'
    : isPatientProfileEmailModification
      ? ''
      : 'Entrez votre e-mail';

  return (
    <div
      className={`${
        isPatientProfileEmailModification
          ? 'w-full flex flex-row items-center mb-4 '
          : 'mb-4 italic'
      }`}
    >
      <label
        htmlFor={inputId}
        className={`${
          isPatientProfileEmailModification
            ? 'text-xs md:text-base xl:text-xl italic'
            : ' text-sm '
        } text-primaryBlue font-medium `}
      >
        E-mail
      </label>
      <input
        type="email"
        name="email"
        id={inputId}
        className={`${
          isPatientProfileEmailModification ? 'w-4/6' : 'w-full'
        } px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50`}
        placeholder={placeholder}
        required
        value={patientEmail}
        onChange={(e) => setPatientEmail(e.target.value)}
      />
    </div>
  );
}
