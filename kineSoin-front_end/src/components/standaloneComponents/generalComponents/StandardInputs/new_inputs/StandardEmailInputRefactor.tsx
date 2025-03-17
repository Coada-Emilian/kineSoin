/**
 * @function StandardEmailInputRefactor
 *
 * A reusable input component that renders an email input field with label and specific styles based on the provided props.
 * It handles the internal state for the email value and updates it when the user types.
 *
 * @param emailInput - An object containing configuration for the email input. Includes attributes such as `id`, `name`, `placeholder`, `value`, and CSS class names.
 *
 * @returns {JSX.Element} - A `div` element containing a label and email input field.
 *
 * @example
 * <StandardEmailInputRefactor emailInput={emailInputData} />
 *
 * @remarks
 * - The component uses `useState` to manage the email input value.
 * - It supports custom class names and styles, and adapts to flexbox layout based on the provided `isFlexRow` prop.
 * - The input is required and has an `autoComplete` attribute to manage form behavior.
 */

import { useState } from 'react';
import { IEmailInput } from '../../../../../@types/inputInterfaces';

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
        required
        autoComplete={emailInput.autoComplete}
      />
    </div>
  );
}
