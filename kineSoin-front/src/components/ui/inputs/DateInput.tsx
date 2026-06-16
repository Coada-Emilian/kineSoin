import { useState } from 'react';
import type { DateInputProps } from '../../../@types/interfaces/customProps';

export default function DateInput({ input }: DateInputProps) {
  // State to store the patient birth date
  const [date, setDate] = useState(input.value || '');

  return (
    <div className={`mb-4 flex flex-col gap-2 items-start w-full italic`}>
      <label htmlFor={input.id} className={`text-primaryBlue font-medium`}>
        {input.labelName}
      </label>

      <input
        type="date"
        name={input.name}
        id={input.id}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50 text-xxs md:text-xs xl:text-sm 2xl:text-md"
        value={date}
        onChange={(e) => setDate(e.currentTarget.value)}
        required={input.isRequired}
      />
    </div>
  );
}
