/**
 * @file PasswordInput.tsx
 * @description A React component that provides a password input field with an
 * option to show or hide the password. It supports repeated password input for
 * confirmation. The component displays a tooltip with password requirements
 * when creating a new password.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.repeatedPassword] - Indicates if the input is for
 * confirming the password.
 * @param {string} [props.therapistPassword] - The current password value.
 * @param {function} [props.setTherapistPassword] - A callback function to
 * update the therapist password.
 * @param {string} [props.therapistRepeatedPassword] - The current repeated
 * password value.
 * @param {function} [props.setTherapistRepeatedPassword] - A callback function
 * to update the repeated therapist password.
 *
 * @returns {JSX.Element} The rendered PasswordInput component, including input
 * fields for password entry and a button to toggle password visibility.
 */

import { useState } from 'react';
import questionIcon from '/icons/question-circle.svg';
import openedEyeIcon from '/icons/eye.svg';
import closedEyeIcon from '/icons/eye-closed.svg';

interface PasswordInputProps {
  repeatedPassword?: boolean;
  therapistPassword?: string;
  setTherapistPassword?: (password: string) => void;
  therapistRepeatedPassword?: string;
  setTherapistRepeatedPassword?: (password: string) => void;
}

export default function PasswordInput({
  repeatedPassword,
  therapistPassword,
  setTherapistPassword,
  therapistRepeatedPassword,
  setTherapistRepeatedPassword,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={`${repeatedPassword ? 'therapist-repeated-password_input' : 'therapist-password_input'}`}
        className=" text-xs md:text-sm font-medium text-gray-700 flex justify-start items-center mb-2"
      >
        {`${repeatedPassword ? 'Confirmer le mot de passe' : 'Mot de passe'}`}{' '}
        <p
          className="text-sm text-center ml-4"
          title={
            !repeatedPassword
              ? '12 caractères minimum avec 1 majuscule, 1 minuscule, 1 chiffre & 1 caractère spécial'
              : undefined
          }
        >
          {!repeatedPassword && (
            <>
              <img src={questionIcon} alt="aide" className="w-6 cursor-help" />
              <span className="sr-only">
                12 caractères minimum avec 1 majuscule, 1 minuscule, 1 chiffre &
                1 caractère spécial
              </span>
            </>
          )}
        </p>
      </label>

      <div className="flex justify-between bg-white rounded-md shadow-sm border">
        <input
          type={showPassword ? 'text' : 'password'}
          id={`${repeatedPassword ? 'therapist-repeated-password_input' : 'therapist-password_input'}`}
          name={repeatedPassword ? 'repeated_password' : 'password'}
          className=" block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
          value={`${repeatedPassword ? therapistRepeatedPassword : therapistPassword ? therapistPassword : ''}`}
          onChange={(e) => {
            `${repeatedPassword && setTherapistRepeatedPassword ? setTherapistRepeatedPassword(e.target.value) : setTherapistPassword ? setTherapistPassword(e.target.value) : ''}`;
          }}
          required
        />

        <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
          <img
            src={showPassword ? closedEyeIcon : openedEyeIcon}
            alt={showPassword ? 'Hide password' : 'Show password'}
            className="h-6 my-auto px-2 w-auto"
          />
        </button>
      </div>
    </div>
  );
}
