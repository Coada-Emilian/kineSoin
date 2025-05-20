/**
 * @component StandardDropdownInputRefactor
 *
 * A refactored dropdown input component that allows users to select an option from a predefined list. It supports dynamic options
 * passed through the `dropdownInput` prop and renders a styled select element.
 *
 * @param {IDropdownInput} dropdownInput - The configuration object that defines the dropdown input properties.
 *
 * @returns {JSX.Element} - The rendered dropdown input field.
 *
 * @example
 * <StandardDropdownInputRefactor
 *   dropdownInput={{
 *     id: 'country-select',
 *     labelName: 'Country',
 *     name: 'country',
 *     isRequired: true,
 *     allOptions: {
 *       startingOption: { value: '', text: 'Select a country' },
 *       options: [
 *         { key: 'US', value: 'US', text: 'United States' },
 *         { key: 'CA', value: 'CA', text: 'Canada' },
 *       ],
 *     },
 *   }}
 * />
 *
 * @remarks
 * - The component renders a `select` element with a label, which includes dynamic options and a required field.
 * - The component supports a `startingOption` and a list of `options`, allowing flexibility in setting the dropdown values.
 */

import { useState } from 'react';
import { IDropdownInput } from '../../../../../@types/interfaces/inputInterfaces';

interface StandardChoiceDropdownProps {
  dropdownInput: IDropdownInput;
}

export default function StandardDropdownInputRefactor({
  dropdownInput,
}: StandardChoiceDropdownProps) {
  const [value, setValue] = useState<string | undefined>(
    dropdownInput.value || ''
  );

  return (
    <div
      className={`${dropdownInput.additionalDivClassName && dropdownInput.additionalDivClassName} mb-2 italic flex ${dropdownInput.isFlexRow ? 'flex-row items-center' : 'flex-col'} gap-2`}
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
        className={`block p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryTeal focus:border-transparent text-xxs md:text-xs xl:text-sm 2xl:text-md`}
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
