import { useState } from 'react';
import type { EmailInputProps } from '../../../@types/interfaces/customProps';

export default function EmailInput({ emailInput }: EmailInputProps) {
  const [email, setEmail] = useState(emailInput.value || '');

  return (
    <div
      className={`${
        emailInput.additionalDivClassName && emailInput.additionalDivClassName
      } 
        ${emailInput.isFlexRow ? 'flex-row items-center' : 'flex-col'}  whitespace-nowrap flex gap-1 w-full text-xs md:text-sm xl:text-md 2xl:text-lg italic mb-4`}
    >
      <label
        htmlFor={emailInput.id}
        className={`${emailInput.additionalLabelClassName && emailInput.additionalLabelClassName} text-primaryBlue font-medium italic w-fit `}
      >
        {emailInput.labelName}
      </label>

      <input
        type="email"
        name={emailInput.name}
        id={emailInput.id}
        className="w-full px-4 py-2.5 text-xs md:text-sm  xl:text-base text-gray-80 bg-white border border-gray-200 rounded-lg shadow-sm placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondaryTeal/40 focus:border-secondaryTeal/50"
        placeholder={emailInput.placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required={emailInput.isRequired}
        autoComplete={emailInput.autoComplete}
      />
    </div>
  );
}
