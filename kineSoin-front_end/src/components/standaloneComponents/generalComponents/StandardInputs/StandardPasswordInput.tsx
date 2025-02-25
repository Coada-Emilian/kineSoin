import openedEyeIcon from '/icons/eye.svg';
import closedEyeIcon from '/icons/eye-closed.svg';
import { useState } from 'react';
import questionIcon from '/icons/question-circle.svg';
import { IPasswordInput } from '../../../../@types/inputTypes';

interface StandardPasswordInputProps {
  passwordInput: IPasswordInput;
}

export default function StandardPasswordInput({
  passwordInput,
}: StandardPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-2 flex flex-col gap-1 italic text-xs md:text-sm xl:text-md 2xl:text-lg">
      <label
        htmlFor={passwordInput.inputId}
        className={`${
          passwordInput.additionalLabelClassName
            ? passwordInput.additionalLabelClassName
            : ''
        } text-primaryBlue font-medium`}
      >
        {passwordInput.labelContent}
        {passwordInput.hasInfoIcon && (
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
          name={passwordInput.inputName}
          id={passwordInput.inputId}
          className="w-full px-4 py-2 border rounded-tl-md rounded-bl-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50 text-xxs md:text-xs xl:text-sm 2xl:text-md "
          placeholder={passwordInput.inputPlaceholder}
          autoComplete={passwordInput.autoComplete}
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
