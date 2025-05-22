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
      className={`${telephoneInput.additionalDivClassName && telephoneInput.additionalDivClassName} flex gap-2 mb-2 ${telephoneInput.isFlexRow ? 'flex-row items-center' : 'flex-col'} whitespace-nowrap items-start italic w-full`}
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
