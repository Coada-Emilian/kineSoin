import { useState } from 'react';
import type { DropdownInputProps } from '../../../@types/interfaces/customProps';

export default function DropdownInput({ input }: DropdownInputProps) {
  const [value, setValue] = useState<string>(
    input.value ?? input.allOptions?.startingOption?.value ?? ''
  );

  return (
    <div
      className={`${input.additionalDivClassName && input.additionalDivClassName} ${input.isLabelNormal ? 'not-italic' : 'italic'} ${input.isFlexRow ? 'flex-row items-center ' : 'flex-col'} whitespace-nowrap flex gap-1 text-xs md:text-sm xl:text-md 2xl:text-lg italic mb-4`}
    >
      <label
        htmlFor={input.id}
        className={`${input.additionalLabelClassName && input.additionalLabelClassName} text-primaryBlue font-medium w-fit`}
      >
        {input.labelName}
      </label>

      <select
        id={input.id}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="w-full px-4 py-2.5 text-xs md:text-sm xl:text-base text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondaryTeal/40 focus:border-secondaryTeal/50"
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
