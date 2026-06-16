import { useState } from 'react';
import type { DropdownInputProps } from '../../../@types/interfaces/customProps';

export default function DropdownInput({ input }: DropdownInputProps) {
  const [value, setValue] = useState<string>(
    input.value ?? input.allOptions?.startingOption?.value ?? ''
  );

  return (
    <div
      className={`${input.additionalDivClassName && input.additionalDivClassName} ${input.isLabelNormal ? 'not-italic' : 'italic'} mb-2  flex ${input.isFlexRow ? 'flex-row items-center ' : 'flex-col'} gap-2`}
    >
      <label
        htmlFor={input.id}
        className={`${input.additionalLabelClassName && input.additionalLabelClassName} text-primaryBlue font-medium`}
      >
        {input.labelName}
      </label>

      <select
        id={input.id}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={`block p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryTeal focus:border-transparent text-xxs md:text-xs xl:text-sm 2xl:text-md w-full`}
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
