import { useState } from 'react';
import type { TextInputProps } from '../../../@types/interfaces/customProps';
import { inputBaseStyle } from '../../../styles/inputBaseStyles';

export default function TextInput({ input }: TextInputProps) {
  const [value, setValue] = useState(input.value || '');

  return (
    <>
      <div
        className={`${input.additionalDivClassName && input.additionalDivClassName} ${input.isFlexRow ? 'flex-row items-center' : 'flex-col'} whitespace-nowrap flex gap-1  text-xs md:text-sm xl:text-md 2xl:text-lg italic mb-4`}
      >
        <label
          htmlFor={input.id}
          className={`${input.additionalLabelClassName && input.additionalLabelClassName} text-primaryBlue font-medium w-fit`}
        >
          {input.labelName}
        </label>
        {input.isTextArea ? (
          <textarea
            name={input.name}
            id={`${input.id}-textarea`}
            placeholder={input.placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-2.5 text-xs md:text-sm xl:text-base text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondaryTeal/40 focus:border-secondaryTeal/50 resize-y"
            cols={32}
            rows={5}
          ></textarea>
        ) : (
          <input
            type="text"
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            className={`${inputBaseStyle}`}
            required={input.isRequired}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete={input.autoComplete}
          />
        )}
      </div>
    </>
  );
}
