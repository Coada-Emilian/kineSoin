import { useState } from 'react';
import type { DateInputProps } from '../../../@types/interfaces/customProps';

export default function DateInput({ input }: DateInputProps) {
  const [date, setDate] = useState(input.value || '');

  return (
    <div
      className={`whitespace-nowrap flex gap-1 w-full text-xs md:text-sm xl:text-md 2xl:text-lg italic mb-4 flex-col`}
    >
      <label
        htmlFor={input.id}
        className={`text-primaryBlue font-medium w-fit`}
      >
        {input.labelName}
      </label>

      <input
        type="date"
        name={input.name}
        id={input.id}
        className="w-full px-4 py-2.5 text-xs md:text-sm  xl:text-base text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondaryTeal/40 focus:border-secondaryTeal/50"
        value={date}
        onChange={(e) => setDate(e.currentTarget.value)}
        required={input.isRequired}
      />
    </div>
  );
}
