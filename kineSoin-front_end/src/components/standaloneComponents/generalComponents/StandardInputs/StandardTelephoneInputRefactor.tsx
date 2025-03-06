import { useState } from 'react';
import { ITelephoneInput } from '../../../../@types/inputInterfaces';

interface StandardTelephoneInputProps {
  telephoneInput: ITelephoneInput;
}

export default function StandardTelephoneInputRefactor({
  telephoneInput,
}: StandardTelephoneInputProps) {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    telephoneInput.inputValue || ''
  );

  return (
    <div className={`flex gap-2 mb-2 w-full flex-col items-start italic`}>
      <label
        htmlFor={telephoneInput.inputId}
        className={`text-primaryBlue font-medium`}
      >
        N° de téléphone
      </label>

      <input
        type="tel"
        name="phone_number"
        id={telephoneInput.inputId}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal text-xxs md:text-xs xl:text-sm 2xl:text-md"
        placeholder="N° de téléphone"
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
