import { useState } from 'react';
import type { DateInputProps } from '../../../@types/props/inputProps';
import {
  inputBaseStyle,
  inputContainerStyle,
  inputLabelStyle,
} from '../../../styles/inputBaseStyles';

export default function DateInput({ input }: DateInputProps) {
  const [date, setDate] = useState(input.value || '');

  return (
    <div className={`${inputContainerStyle} flex-col`}>
      <label htmlFor={input.id} className={`${inputLabelStyle}`}>
        {input.labelName}
      </label>

      <input
        type="date"
        name={input.name}
        id={input.id}
        className={`${inputBaseStyle}`}
        value={date}
        onChange={(e) => setDate(e.currentTarget.value)}
        required={input.isRequired}
      />
    </div>
  );
}
