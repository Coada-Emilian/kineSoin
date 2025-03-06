import { useState } from 'react';
import { IDateInput } from '../../../../../@types/inputInterfaces';

interface StandardDateInputProps {
  dateInput: IDateInput;
}

export default function StandardDateInputRefactor({
  dateInput,
}: StandardDateInputProps) {
  // State to store the patient birth date
  const [date, setDate] = useState(dateInput.inputValue || '');

  return (
    <div className={`mb-4 flex flex-col gap-2 items-start w-full italic`}>
      <label
        htmlFor={dateInput.inputId}
        className={`text-primaryBlue font-medium`}
      >
        {dateInput.labelName}
      </label>

      <input
        type="date"
        name={dateInput.inputName}
        id={dateInput.inputId}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50 text-xxs md:text-xs xl:text-sm 2xl:text-md"
        value={date}
        onChange={(e) => setDate(e.currentTarget.value)}
        required={dateInput.isRequired}
      />
    </div>
  );
}
