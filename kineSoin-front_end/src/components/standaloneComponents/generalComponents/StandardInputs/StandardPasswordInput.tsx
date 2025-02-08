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
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4 italic">
      <label
        htmlFor={`${
          isPatientLoginPagePasswordInput
            ? 'patient-connexion-password_input'
            : isTherapistLoginPagePasswordInput
              ? 'therapist-connexion-password_input'
              : isPatientRegisterPasswordInput
                ? 'patient-register-password_input'
                : isPatientRegisterConfirmPasswordInput
                  ? 'patient-register-confirm-password_input'
                  : isAdminPasswordInput
                    ? 'admin-password_input'
                    : isAdminTherapistAddPasswordInput
                      ? 'admin-therapist-password_input'
                      : isAdminTherapistAddRepeatedPasswordInput
                        ? 'admin-therapist-repeated-password_input'
                        : ''
        }`}
        className={`${isPatientRegisterPasswordInput || isNewPasswordInput || isAdminTherapistAddPasswordInput ? 'flex mb-1 items-center' : ''} text-primaryBlue text-sm font-medium`}
      >
        {isOldPasswordInput
          ? 'Ancien mot de passe'
          : isNewPasswordInput
            ? 'Nouveau mot de passe'
            : isRepeatPasswordInput
              ? 'Confirmer le mot de passe'
              : isAdminTherapistAddPasswordInput
                ? 'Mot de passe'
                : isAdminTherapistAddRepeatedPasswordInput
                  ? 'Confirmer le mot de passe'
                  : !isPatientRegisterConfirmPasswordInput
                    ? 'Mot de passe'
                    : 'Confirmation mot de passe'}

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
          name={
            isPatientRegisterConfirmPasswordInput
              ? 'confirm-password'
              : isOldPasswordInput
                ? 'old_password'
                : isNewPasswordInput
                  ? 'new_password'
                  : isRepeatPasswordInput
                    ? 'repeat_password'
                    : isAdminTherapistAddPasswordInput
                      ? 'password'
                      : isAdminTherapistAddRepeatedPasswordInput
                        ? 'repeated_password'
                        : 'password'
          }
          id={`${
            isPatientLoginPagePasswordInput
              ? 'patient-connexion-password_input'
              : isTherapistLoginPagePasswordInput
                ? 'therapist-connexion-password_input'
                : isPatientRegisterPasswordInput
                  ? 'patient-register-password_input'
                  : isPatientRegisterConfirmPasswordInput
                    ? 'patient-register-confirm-password_input'
                    : isAdminPasswordInput
                      ? 'admin-password_input'
                      : isAdminTherapistAddPasswordInput
                        ? 'admin-therapist-password_input'
                        : isAdminTherapistAddRepeatedPasswordInput
                          ? 'admin-therapist-repeated-password_input'
                          : ''
          }`}
          className="w-full px-4 py-2 border rounded-tl-md rounded-bl-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50"
          placeholder={
            isOldPasswordInput
              ? 'Entrez votre ancien mot de passe'
              : isNewPasswordInput
                ? 'Entrez votre nouveau mot de passe'
                : isRepeatPasswordInput
                  ? 'Répétez le mot de passe'
                  : isAdminTherapistAddPasswordInput
                    ? 'Entrez le mot de passe'
                    : isAdminTherapistAddRepeatedPasswordInput
                      ? 'Confirmez le mot de passe'
                      : !isPatientRegisterConfirmPasswordInput
                        ? 'Entrez votre mot de passe'
                        : 'Confirmez le mot de passe'
          }
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="bg-white rounded-tr-md rounded-br-md"
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
