import { useState } from 'react';
import type { TelephoneInputProps } from '../../../@types/props/customProps';
import {
  inputBaseStyle,
  inputContainerStyle,
  inputLabelStyle,
} from '../../../styles/inputBaseStyles';

export default function TelephoneInput({ input }: TelephoneInputProps) {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    input.value || ''
  );

  return (
    <div
      className={`${input.additionalDivClassName && input.additionalDivClassName} ${input.isFlexRow ? 'flex-row items-center' : 'flex-col'} ${inputContainerStyle}`}
    >
      <label
        htmlFor={input.id}
        className={`${input.additionalLabelClassName && input.additionalLabelClassName} ${inputLabelStyle}`}
      >
        N° téléphone
      </label>

      <input
        type="tel"
        name="phone_number"
        id={input.id}
        className={inputBaseStyle}
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
