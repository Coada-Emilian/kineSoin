import { useState } from 'react';
import type { PasswordInputProps } from '../../../@types/interfaces/customProps';
import closedEyeIcon from '/icons/eye-closed.svg';
import openedEyeIcon from '/icons/eye.svg';
import questionIcon from '/icons/question-circle.svg';

export default function PasswordInput({ input }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState(
    typeof input.value === 'string' ? input.value : ''
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleButtonClick = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className={`${
        input.additionalDivClassName && input.additionalDivClassName
      } ${input.isFlexRow ? 'flex-row' : 'flex-col'} flex gap-1 italic text-xs md:text-sm xl:text-md 2xl:text-lg mb-4`}
    >
      <label
        htmlFor={input.id}
        className={`${
          input.additionalLabelClassName && input.additionalLabelClassName
        } ${input.hasInfoIcon && 'flex-row items-center'} text-primaryBlue font-medium flex gap-1`}
      >
        {input.labelName}
        {input.hasInfoIcon && (
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

      <div className="flex rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-gray-300 focus-within:border-secondaryTeal focus-within:ring-2 focus-within:ring-secondaryTeal/40">
        <input
          type={showPassword ? 'text' : 'password'}
          name={input.name}
          id={input.id}
          className="w-full px-4 py-2.5 text-xs md:text-sm xl:text-base text-gray-800 bg-transparent placeholder:text-gray-400 rounded-l-lg focus:outline-none"
          placeholder={input.placeholder}
          autoComplete={input.autoComplete}
          required
          value={password}
          onChange={handleInputChange}
        />

        <button
          type="button"
          onClick={handleButtonClick}
          className="px-3 flex items-center justify-center rounded-r-lg hover:bg-gray-50 transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <img
            src={showPassword ? closedEyeIcon : openedEyeIcon}
            alt={showPassword ? 'Hide password' : 'Show password'}
            className="h-5 w-5 opacity-70 hover:opacity-100 transition-opacity"
          />
        </button>
      </div>
    </div>
  );
}
