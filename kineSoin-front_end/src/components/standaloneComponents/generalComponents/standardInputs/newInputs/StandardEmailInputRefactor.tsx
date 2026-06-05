import { useState } from 'react';
import { IEmailInput } from '../../../../../@types/interfaces/inputInterfaces';

interface StandardEmailInputProps {
  emailInput: IEmailInput;
}

export default function StandardEmailInputRefactor({
  emailInput,
}: StandardEmailInputProps) {
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
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50 text-xxs md:text-xs xl:text-sm 2xl:text-md w-full"
        placeholder={emailInput.placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required={emailInput.isRequired}
        autoComplete={emailInput.autoComplete}
      />
    </div>
  );
}
