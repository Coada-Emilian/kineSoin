import { useState } from 'react';
import { IDropdownInput } from '../../../../../@types/inputInterfaces';

interface StandardChoiceDropdownProps {
  dropdownInput: IDropdownInput;
}

export default function StandardDropdownInputRefactor({
  dropdownInput,
}: StandardChoiceDropdownProps) {
  const [value, setValue] = useState<string | undefined>(
    dropdownInput.inputValue || ''
  );

  return (
    <div
      className={`${dropdownInput.additionalDivClassName && dropdownInput.additionalDivClassName} mb-2 italic flex flex-col gap-2`}
    >
      <label
        htmlFor={dropdownInput.inputId}
        className={`text-primaryBlue font-medium`}
      >
        {dropdownInput.labelName}
      </label>

      <select
        id={dropdownInput.inputId}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={`block p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryTeal focus:border-transparent text-xxs md:text-xs xl:text-sm 2xl:text-md`}
        name={dropdownInput.inputName}
        required={dropdownInput.isRequired}
      >
        <option value={dropdownInput.allOptions?.startingOption?.value}>
          {dropdownInput.allOptions?.startingOption?.text}
        </option>

        {dropdownInput.allOptions?.options?.map((option) => (
          <option key={option.key} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}
