import { useState } from 'react';
import type { TelephoneInputProps } from '../../../@types/interfaces/customProps';

export default function TelephoneInput({ input }: TelephoneInputProps) {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    input.value || ''
  );

  return (
    <div
      className={`${input.additionalDivClassName && input.additionalDivClassName} flex gap-2 mb-2 ${input.isFlexRow ? 'flex-row items-center' : 'flex-col'} whitespace-nowrap items-start italic`}
    >
      <label
        htmlFor={input.id}
        className={`${input.additionalLabelClassName && input.additionalLabelClassName} text-primaryBlue font-medium`}
      >
        N° téléphone
      </label>

      <input
        type="tel"
        name="phone_number"
        id={input.id}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal text-xxs md:text-xs xl:text-sm 2xl:text-md"
        placeholder={input.placeholder || 'N° de téléphone'}
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
        required={input.isRequired}
        autoComplete={input.autoComplete}
      />
    </div>
  );
}
