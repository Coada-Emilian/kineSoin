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

  const getInputId = () =>
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
                  : isOldPasswordInput
                    ? 'old-password_input'
                    : isNewPasswordInput
                      ? 'new-password_input'
                      : isRepeatPasswordInput
                        ? 'repeat-password_input'
                        : '';

  const getInputName = () =>
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
                : 'password';

  const getPlaceholder = () =>
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
              : isPatientRegisterConfirmPasswordInput
                ? 'Confirmez le mot de passe'
                : 'Entrez votre mot de passe';

  const getLabelText = () =>
    isOldPasswordInput
      ? 'Ancien mot de passe'
      : isNewPasswordInput
        ? 'Nouveau mot de passe'
        : isRepeatPasswordInput
          ? 'Confirmer le mot de passe'
          : isAdminTherapistAddPasswordInput
            ? 'Mot de passe'
            : isAdminTherapistAddRepeatedPasswordInput
              ? 'Confirmer le mot de passe'
              : isPatientRegisterConfirmPasswordInput
                ? 'Confirmation mot de passe'
                : 'Mot de passe';

  const getAutoComplete = () =>
    isPatientRegisterPasswordInput
      ? 'password'
      : isPatientRegisterConfirmPasswordInput
        ? 'repeated password'
        : isOldPasswordInput
          ? 'current-password'
          : isNewPasswordInput
            ? 'new-password'
            : isRepeatPasswordInput
              ? 'repeated password'
              : isAdminTherapistAddPasswordInput
                ? 'new-password'
                : isAdminTherapistAddRepeatedPasswordInput
                  ? 'repeated-password'
                  : 'current-password';

  return (
    <div className="mb-4 italic">
      <label
        htmlFor={getInputId()}
        className={`${
          isPatientRegisterPasswordInput ||
          isNewPasswordInput ||
          isAdminTherapistAddPasswordInput
            ? 'flex mb-1 items-center'
            : ''
        } text-primaryBlue text-sm font-medium`}
      >
        {getLabelText()}
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
          name={getInputName()}
          id={getInputId()}
          className="w-full px-4 py-2 border rounded-tl-md rounded-bl-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50 placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-base"
          placeholder={getPlaceholder()}
          autoComplete={getAutoComplete()}
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
