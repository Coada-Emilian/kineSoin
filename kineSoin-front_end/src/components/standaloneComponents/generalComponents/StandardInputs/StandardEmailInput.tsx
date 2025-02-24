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

  const getInputClassName = () => {
    return 'px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50 text-xxs md:text-xs xl:text-sm 2xl:text-md';
  };

  const getInputPlaceholder = () => {
    return isAdminTherapistAddEmailInput
      ? 'E-mail du kinésithérapeute'
      : isPatientProfileEmailModification
        ? ''
        : 'Entrez votre e-mail';
  };

  const [patientEmail, setPatientEmail] = useState(
    patient_email ? patient_email : ''
  );

  return (
    <div
      className={`${
        isPatientProfileEmailModification
          ? 'w-full flex flex-row items-center gap-1 mb-4 text-xxs md:text-xs xl:text-sm 2xl:text-md italic'
          : 'mb-4 italic flex flex-col w-full text-xxs md:text-xs xl:text-sm 2xl:text-md'
      }`}
    >
      <label
        htmlFor={getInputId()}
        className={`${isPatientProfileEmailModification ? 'w-1/6 md:w-1/12' : ''} text-primaryBlue font-medium italic `}
      >
        E-mail
      </label>

      <input
        type="email"
        name="email"
        id={getInputId()}
        className={getInputClassName()}
        placeholder={getInputPlaceholder()}
        required
        value={patientEmail}
        onChange={(e) => setPatientEmail(e.target.value)}
        autoComplete="email"
      />
    </div>
  );
}
