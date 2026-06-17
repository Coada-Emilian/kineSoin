import { useState } from 'react';
import type { TelephoneInputProps } from '../../../@types/interfaces/customProps';

export default function TelephoneInput({ input }: TelephoneInputProps) {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    input.value || ''
  );

  return (
    <div
      className={`${input.additionalDivClassName && input.additionalDivClassName} ${input.isFlexRow ? 'flex-row items-center' : 'flex-col'} whitespace-nowrap flex gap-1 w-full text-xs md:text-sm xl:text-md 2xl:text-lg italic mb-4`}
    >
      <label
        htmlFor={input.id}
        className={`${input.additionalLabelClassName && input.additionalLabelClassName} text-primaryBlue font-medium w-fit`}
      >
        N° téléphone
      </label>

      <input
        type="tel"
        name="phone_number"
        id={input.id}
        className="w-full px-4 py-2.5 text-xs md:text-sm  xl:text-base text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondaryTeal/40 focus:border-secondaryTeal/50"
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
