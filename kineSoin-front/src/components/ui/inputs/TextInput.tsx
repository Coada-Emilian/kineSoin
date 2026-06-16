import { useState } from 'react';
import type { TextInputProps } from '../../../@types/interfaces/customProps';

export default function TextInput({ input }: TextInputProps) {
  const [value, setValue] = useState(input.value || '');

  return (
    <>
      <div
        className={`${input.additionalDivClassName ? input.additionalDivClassName : 'w-full'}  flex ${input.isFlexRow ? 'flex-row items-center' : 'flex-col'} mb-4 gap-2 italic`}
      >
        <label
          htmlFor={input.id}
          className={`${input.additionalLabelClassName && input.additionalLabelClassName} text-primaryBlue font-medium`}
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
            className="mt-1 block text-xs text-xxs md:text-xs xl:text-sm 2xl:text-md sm:text-xs lg:text-base w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal font-normal placeholder:text-xs md:placeholder:text-md xl:placeholder:text-lg "
            cols={32}
            rows={5}
          ></textarea>
        ) : (
          <input
            type="text"
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            className="text-xxs md:text-xs xl:text-sm 2xl:text-md w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal"
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
