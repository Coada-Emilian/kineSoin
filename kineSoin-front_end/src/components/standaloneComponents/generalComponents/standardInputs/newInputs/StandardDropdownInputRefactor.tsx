import { useState } from 'react';
import { IDropdownInput } from '../../../../../@types/interfaces/inputInterfaces';

interface StandardChoiceDropdownProps {
  dropdownInput: IDropdownInput;
}

export default function StandardDropdownInputRefactor({
  dropdownInput,
}: StandardChoiceDropdownProps) {
  const [value, setValue] = useState<string>(
    dropdownInput.value ?? dropdownInput.allOptions?.startingOption?.value ?? ''
  );

  return (
    <div
      className={`${dropdownInput.additionalDivClassName && dropdownInput.additionalDivClassName} ${dropdownInput.isLabelNormal ? 'not-italic' : 'italic'} mb-2  flex ${dropdownInput.isFlexRow ? 'flex-row items-center ' : 'flex-col'} gap-2`}
    >
      <label
        htmlFor={dropdownInput.id}
        className={`${dropdownInput.additionalLabelClassName && dropdownInput.additionalLabelClassName} text-primaryBlue font-medium`}
      >
        {dropdownInput.labelName}
      </label>

      <select
        id={dropdownInput.id}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={`block p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryTeal focus:border-transparent text-xxs md:text-xs xl:text-sm 2xl:text-md w-full`}
        name={dropdownInput.name}
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
