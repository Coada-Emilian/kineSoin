import { useState } from 'react';
import type { DropdownInputProps } from '../../../@types/interfaces/customProps';
import {
  inputBaseStyle,
  inputContainerStyle,
  inputLabelStyle,
} from '../../../styles/inputBaseStyles';

export default function DropdownInput({ input }: DropdownInputProps) {
  const [value, setValue] = useState<string>(
    input.value ?? input.allOptions?.startingOption?.value ?? ''
  );

  return (
    <div
      className={`${input.additionalDivClassName && input.additionalDivClassName} ${input.isLabelNormal ? 'not-italic' : 'italic'} ${input.isFlexRow ? 'flex-row items-center ' : 'flex-col'} ${inputContainerStyle}`}
    >
      <label
        htmlFor={input.id}
        className={`${input.additionalLabelClassName && input.additionalLabelClassName} ${inputLabelStyle}`}
      >
        {input.labelName}
      </label>

      <select
        id={input.id}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={inputBaseStyle}
        name={input.name}
        required={input.isRequired}
      >
        <option value={input.allOptions?.startingOption?.value}>
          {input.allOptions?.startingOption?.text}
        </option>

        {input.allOptions?.options?.map((option) => (
          <option key={option.key} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}
