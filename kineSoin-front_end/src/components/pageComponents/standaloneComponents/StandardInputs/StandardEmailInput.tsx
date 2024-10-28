interface StandardEmailInputProps {
  isPatientLoginPageEmailInput?: boolean;
  patientLoginEmail?: string;
  setPatientLoginEmail?: React.Dispatch<React.SetStateAction<string>>;
  isTherapistLoginPageEmailInput?: boolean;
  therapistLoginEmail?: string;
  setTherapistLoginEmail?: React.Dispatch<React.SetStateAction<string>>;
}

export default function StandardEmailInput({
  isPatientLoginPageEmailInput,
  patientLoginEmail,
  setPatientLoginEmail,
  isTherapistLoginPageEmailInput,
  therapistLoginEmail,
  setTherapistLoginEmail,
}: StandardEmailInputProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={`${isPatientLoginPageEmailInput ? 'patient-connexion-email_input' : isTherapistLoginPageEmailInput ? 'therapist-connexion-email_input' : ''}`}
        className="text-gray-600 text-sm font-medium"
      >
        E-mail
      </label>
      <input
        type="email"
        name="email"
        id={`${isPatientLoginPageEmailInput ? 'patient-connexion-email_input' : isTherapistLoginPageEmailInput ? 'therapist-connexion-email_input' : ''}`}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Entrez votre e-mail"
        value={`${patientLoginEmail ? patientLoginEmail : isTherapistLoginPageEmailInput ? therapistLoginEmail : ''}`}
        onChange={(e) => {
          `${setPatientLoginEmail ? setPatientLoginEmail(e.target.value) : setTherapistLoginEmail ? setTherapistLoginEmail(e.target.value) : ''}`;
        }}
      />
    </div>
  );
}
