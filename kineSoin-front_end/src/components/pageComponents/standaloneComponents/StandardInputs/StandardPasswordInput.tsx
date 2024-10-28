import openedEyeIcon from '/icons/eye.svg';
import closedEyeIcon from '/icons/eye-closed.svg';
import { useState } from 'react';

interface StandardPasswordInputProps {
  isPatientLoginPagePasswordInput?: boolean;
  patientLoginPassword?: string;
  setPatientLoginPassword?: React.Dispatch<React.SetStateAction<string>>;
  isTherapistLoginPagePasswordInput?: boolean;
  therapistLoginPassword?: string;
  setTherapistLoginPassword?: React.Dispatch<React.SetStateAction<string>>;
}

export default function StandardPasswordInput({
  isPatientLoginPagePasswordInput,
  patientLoginPassword,
  setPatientLoginPassword,
  isTherapistLoginPagePasswordInput,
  therapistLoginPassword,
  setTherapistLoginPassword,
}: StandardPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label
        htmlFor={`${isPatientLoginPagePasswordInput ? 'patient-connexion-password_input' : isTherapistLoginPagePasswordInput ? 'therapist-connexion-password_input' : ''}`}
        className="text-gray-600 text-sm font-medium"
      >
        Mot de passe
      </label>
      <div className="flex rounded-md shadow-sm border">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id={`${isPatientLoginPagePasswordInput ? 'patient-connexion-password_input' : isTherapistLoginPagePasswordInput ? 'therapist-connexion-password_input' : ''}`}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Entrez votre mot de passe"
          value={
            patientLoginPassword
              ? patientLoginPassword
              : isTherapistLoginPagePasswordInput
                ? therapistLoginPassword
                : ''
          }
          onChange={(e) =>
            setPatientLoginPassword
              ? setPatientLoginPassword(e.target.value)
              : setTherapistLoginPassword
                ? setTherapistLoginPassword(e.target.value)
                : ''
          }
        />
        <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
          <img
            src={showPassword ? closedEyeIcon : openedEyeIcon}
            alt={showPassword ? 'Hide password' : 'Show password'}
            className="h-6 my-auto px-2 w-auto opacity-90"
          />
        </button>
      </div>
    </div>
  );
}
