interface StandardEmailInputProps {
  isPatientLoginPageEmailInput?: boolean;
  patientLoginEmail?: string;
  setPatientLoginEmail?: (email: string) => void;
}

export default function StandardEmailInput({
  isPatientLoginPageEmailInput,
  patientLoginEmail,
  setPatientLoginEmail,
}: StandardEmailInputProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={`${isPatientLoginPageEmailInput && 'patient-connexion-email_input'}`}
        className="text-gray-600 text-sm font-medium"
      >
        E-mail
      </label>
      <input
        type="email"
        name="email"
        id={`${isPatientLoginPageEmailInput && 'patient-connexion-email_input'}`}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Entrez votre e-mail"
        value={`${patientLoginEmail && patientLoginEmail}`}
        onChange={(e) => {
          `${setPatientLoginEmail && setPatientLoginEmail(e.target.value)}`;
        }}
      />
    </div>
  );
}
