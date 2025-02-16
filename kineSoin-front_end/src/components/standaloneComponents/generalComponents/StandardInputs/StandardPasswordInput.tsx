import openedEyeIcon from '/icons/eye.svg';
import closedEyeIcon from '/icons/eye-closed.svg';
import { useState } from 'react';
import questionIcon from '/icons/question-circle.svg';

interface StandardPasswordInputProps {
  isPatientLoginPagePasswordInput?: boolean;
  isTherapistLoginPagePasswordInput?: boolean;
  isPatientRegisterPasswordInput?: boolean;
  isPatientRegisterConfirmPasswordInput?: boolean;
  isOldPasswordInput?: boolean;
  isNewPasswordInput?: boolean;
  isRepeatPasswordInput?: boolean;
  isAdminPasswordInput?: boolean;
  isAdminTherapistAddPasswordInput?: boolean;
  isAdminTherapistAddRepeatedPasswordInput?: boolean;
}

export default function StandardPasswordInput({
  isPatientLoginPagePasswordInput,
  isTherapistLoginPagePasswordInput,
  isPatientRegisterPasswordInput,
  isPatientRegisterConfirmPasswordInput,
  isOldPasswordInput,
  isNewPasswordInput,
  isRepeatPasswordInput,
  isAdminPasswordInput,
  isAdminTherapistAddPasswordInput,
  isAdminTherapistAddRepeatedPasswordInput,
}: StandardPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const getInputId = () => {
    if (isPatientLoginPagePasswordInput)
      return 'patient-connexion-password_input';
    if (isTherapistLoginPagePasswordInput)
      return 'therapist-connexion-password_input';
    if (isPatientRegisterPasswordInput)
      return 'patient-register-password_input';
    if (isPatientRegisterConfirmPasswordInput)
      return 'patient-register-confirm-password_input';
    if (isAdminPasswordInput) return 'admin-password_input';
    if (isAdminTherapistAddPasswordInput)
      return 'admin-therapist-password_input';
    if (isAdminTherapistAddRepeatedPasswordInput)
      return 'admin-therapist-repeated-password_input';
    if (isOldPasswordInput) return 'old-password_input';
    if (isNewPasswordInput) return 'new-password_input';
    if (isRepeatPasswordInput) return 'repeat-password_input';
    return '';
  };

  const getInputName = () => {
    if (isPatientRegisterConfirmPasswordInput) return 'confirm-password';
    if (isOldPasswordInput) return 'old_password';
    if (isNewPasswordInput) return 'new_password';
    if (isRepeatPasswordInput) return 'repeat_password';
    if (isAdminTherapistAddPasswordInput) return 'password';
    if (isAdminTherapistAddRepeatedPasswordInput) return 'repeated_password';
    return 'password';
  };

  const getPlaceholder = () => {
    if (isOldPasswordInput) return 'Entrez votre ancien mot de passe';
    if (isNewPasswordInput) return 'Entrez votre nouveau mot de passe';
    if (isRepeatPasswordInput) return 'Répétez le mot de passe';
    if (isAdminTherapistAddPasswordInput) return 'Entrez le mot de passe';
    if (isAdminTherapistAddRepeatedPasswordInput)
      return 'Confirmez le mot de passe';
    if (isPatientRegisterConfirmPasswordInput)
      return 'Confirmez le mot de passe';
    return 'Entrez votre mot de passe';
  };

  const getLabelText = () => {
    if (isOldPasswordInput) return 'Ancien mot de passe';
    if (isNewPasswordInput) return 'Nouveau mot de passe';
    if (isRepeatPasswordInput) return 'Confirmer le mot de passe';
    if (isAdminTherapistAddPasswordInput) return 'Mot de passe';
    if (isAdminTherapistAddRepeatedPasswordInput)
      return 'Confirmer le mot de passe';
    if (isPatientRegisterConfirmPasswordInput)
      return 'Confirmation mot de passe';
    return 'Mot de passe';
  };

  const inputId = getInputId();
  const inputName = getInputName();
  const placeholder = getPlaceholder();
  const labelText = getLabelText();

  return (
    <div className="mb-4 italic">
      <label
        htmlFor={inputId}
        className={`${
          isPatientRegisterPasswordInput ||
          isNewPasswordInput ||
          isAdminTherapistAddPasswordInput
            ? 'flex mb-1 items-center'
            : ''
        } text-primaryBlue text-sm font-medium`}
      >
        {labelText}
        {(isPatientRegisterPasswordInput ||
          isNewPasswordInput ||
          isAdminTherapistAddPasswordInput) && (
          <p
            className="text-sm text-center ml-4"
            title="12 caractères minimum avec 1 majuscule, 1 minuscule, 1 chiffre & 1 caractère spécial"
          >
            <img src={questionIcon} alt="aide" className="w-6 cursor-help" />
            <span className="sr-only">
              12 caractères minimum avec 1 majuscule, 1 minuscule, 1 chiffre & 1
              caractère spécial
            </span>
          </p>
        )}
      </label>
      <div className="flex rounded-md shadow-sm border">
        <input
          type={showPassword ? 'text' : 'password'}
          name={inputName}
          id={inputId}
          className="w-full px-4 py-2 border rounded-tl-md rounded-bl-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="bg-white rounded-tr-md rounded-br-md"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <img
            src={showPassword ? closedEyeIcon : openedEyeIcon}
            alt={showPassword ? 'Hide password' : 'Show password'}
            className="h-6 my-auto px-2 w-auto opacity-90 bg-white"
          />
        </button>
      </div>
    </div>
  );
}
