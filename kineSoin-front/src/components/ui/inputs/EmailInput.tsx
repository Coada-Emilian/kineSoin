import { useState } from 'react';
import type { EmailInputProps } from '../../../@types/interfaces/customProps';

export default function EmailInput({ input }: EmailInputProps) {
  const [email, setEmail] = useState(input.value || '');

  return (
    <div
      className={`${
        input.additionalDivClassName && input.additionalDivClassName
      } 
        ${input.isFlexRow ? 'flex-row items-center' : 'flex-col'}  whitespace-nowrap flex gap-1 w-full text-xs md:text-sm xl:text-md 2xl:text-lg italic mb-4`}
    >
      <label
        htmlFor={input.id}
        className={`${input.additionalLabelClassName && input.additionalLabelClassName} text-primaryBlue font-medium italic w-fit `}
      >
        {input.labelName}
      </label>

      <input
        type="email"
        name={input.name}
        id={input.id}
        className="w-full px-4 py-2.5 text-xs md:text-sm  xl:text-base text-gray-80 bg-white border border-gray-200 rounded-lg shadow-sm placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondaryTeal/40 focus:border-secondaryTeal/50"
        placeholder={input.placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required={input.isRequired}
        autoComplete={input.autoComplete}
      />
    </div>
  );
}
