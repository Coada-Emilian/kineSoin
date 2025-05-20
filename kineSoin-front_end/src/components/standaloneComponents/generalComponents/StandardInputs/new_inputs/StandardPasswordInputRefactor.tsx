/**
 * @function StandardPasswordInputRefactor
 *
 * A reusable password input component that renders a password field with a show/hide password toggle button.
 * It handles the internal state for the password value and the visibility of the password.
 *
 * @param passwordInput - An object containing configuration for the password input. Includes attributes such as `id`, `name`, `placeholder`, `value`, `labelName`, and other optional styles and icons.
 *
 * @returns {JSX.Element} - A `div` element containing a label, password input field, and a toggle button for showing/hiding the password.
 *
 * @example
 * <StandardPasswordInputRefactor passwordInput={passwordInputData} />
 *
 * @remarks
 * - The component uses `useState` to manage the password value and the visibility state.
 * - It supports custom class names, flexbox layout, and an info icon for additional help on password requirements.
 * - The toggle button switches between showing the password in plain text and hiding it.
 */

import { useState } from 'react';
import { IPasswordInput } from '../../../../../@types/interfaces/inputInterfaces';
import closedEyeIcon from '/icons/eye-closed.svg';
import openedEyeIcon from '/icons/eye.svg';
import questionIcon from '/icons/question-circle.svg';

interface StandardPasswordInputProps {
  passwordInput: IPasswordInput;
}

export default function StandardPasswordInputRefactor({
  passwordInput,
}: StandardPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(
    typeof passwordInput.value === 'string' ? passwordInput.value : ''
  );

  return (
    <div
      className={`${
        passwordInput.additionalDivClassName &&
        passwordInput.additionalDivClassName
      } ${passwordInput.isFlexRow ? 'flex-row' : 'flex-col'} flex gap-1 italic text-xs md:text-sm xl:text-md 2xl:text-lg mb-4`}
    >
      <label
        htmlFor={passwordInput.id}
        className={`${
          passwordInput.additionalLabelClassName &&
          passwordInput.additionalLabelClassName
        } ${passwordInput.hasInfoIcon && 'flex-row items-center'} text-primaryBlue font-medium flex gap-1`}
      >
        {passwordInput.labelName}
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
          name={passwordInput.name}
          id={passwordInput.id}
          className="w-full px-4 py-2 border rounded-tl-md rounded-bl-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50 text-xxs md:text-xs xl:text-sm 2xl:text-md "
          placeholder={passwordInput.placeholder}
          autoComplete={passwordInput.autoComplete}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
