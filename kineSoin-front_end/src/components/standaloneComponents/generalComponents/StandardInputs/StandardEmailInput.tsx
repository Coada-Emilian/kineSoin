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
  const getInputId = () =>
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
              : isPatientProfileEmailModification
                ? 'patient_email_input'
                : '';

  const [patientEmail, setPatientEmail] = useState(
    patient_email ? patient_email : ''
  );

  const getInputClassName = () => {
    return `${
      isPatientProfileEmailModification ? 'w-full' : 'w-full'
    } px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50`;
  };

  const inputId = getInputId();
  const inputClassName = getInputClassName();
  
  const placeholder = isAdminTherapistAddEmailInput
    ? 'E-mail du kinésithérapeute'
    : isPatientProfileEmailModification
      ? ''
      : 'Entrez votre e-mail';

  return (
    <div
      className={`${
        isPatientProfileEmailModification
          ? 'w-full flex flex-row items-center gap-2 mb-4 '
          : 'mb-4 italic'
      }`}
    >
      <label
        htmlFor={inputId}
        className={`${
          isPatientProfileEmailModification
            ? 'text-xs md:text-base xl:text-xl italic w-1/4 flex justify-start'
            : ' text-sm '
        } text-primaryBlue font-medium `}
      >
        E-mail
      </label>

      <input
        type="email"
        name="email"
        id={inputId}
        className={inputClassName}
        placeholder={placeholder}
        required
        value={patientEmail}
        onChange={(e) => setPatientEmail(e.target.value)}
        autoComplete="email"
      />
    </div>
  );
}
