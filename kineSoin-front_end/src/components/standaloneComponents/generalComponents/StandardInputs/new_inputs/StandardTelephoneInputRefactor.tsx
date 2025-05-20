/**
 * @component StandardTelephoneInputRefactor
 *
 * A refactored telephone input component that allows users to enter a phone number.
 * It supports dynamic properties like placeholder, validation, and automatic population.
 *
 * @param {ITelephoneInput} telephoneInput - The configuration object that defines the telephone input properties.
 *
 * @returns {JSX.Element} - The rendered telephone input field.
 *
 * @example
 * <StandardTelephoneInputRefactor
 *   telephoneInput={{
 *     id: 'phone-number-input',
 *     value: '',
 *     placeholder: 'Enter your phone number',
 *     isRequired: true,
 *     autoComplete: 'tel',
 *   }}
 * />
 *
 * @remarks
 * - The component includes validation for required fields, placeholder support, and auto-completion for better UX.
 * - It tracks the phone number in the state and updates it as the user types.
 */

import { useState } from 'react';
import { ITelephoneInput } from '../../../../../@types/interfaces/inputInterfaces';

interface StandardTelephoneInputProps {
  telephoneInput: ITelephoneInput;
}

export default function StandardTelephoneInputRefactor({
  telephoneInput,
}: StandardTelephoneInputProps) {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    telephoneInput.value || ''
  );

  return (
    <div
      className={`${telephoneInput.additionalDivClassName && telephoneInput.additionalDivClassName}flex gap-2 mb-2 ${telephoneInput.isFlexRow ? 'flex-row items-center' : 'flex-col'} whitespace-nowrap items-start italic`}
    >
      <label
        htmlFor={telephoneInput.id}
        className={`${telephoneInput.additionalLabelClassName && telephoneInput.additionalLabelClassName} text-primaryBlue font-medium`}
      >
        N° de téléphone
      </label>

      <input
        type="tel"
        name="phone_number"
        id={telephoneInput.id}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal text-xxs md:text-xs xl:text-sm 2xl:text-md"
        placeholder={telephoneInput.placeholder || 'N° de téléphone'}
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
        required={telephoneInput.isRequired}
        autoComplete={telephoneInput.autoComplete}
      />
    </div>
  );
}
