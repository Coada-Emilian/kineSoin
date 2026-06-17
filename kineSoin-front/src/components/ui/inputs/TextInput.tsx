import { useState } from 'react';
import type { TextInputProps } from '../../../@types/interfaces/customProps';
import {
  inputBaseStyle,
  inputContainerStyle,
  inputLabelStyle,
} from '../../../styles/inputBaseStyles';

export default function TextInput({ input }: TextInputProps) {
  const [value, setValue] = useState(input.value || '');

  return (
    <>
      <div
        className={`${input.additionalDivClassName && input.additionalDivClassName} ${input.isFlexRow ? 'flex-row items-center' : 'flex-col'} ${inputContainerStyle}`}
      >
        <label
          htmlFor={input.id}
          className={`${input.additionalLabelClassName && input.additionalLabelClassName} ${inputLabelStyle}`}
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
            className={inputBaseStyle}
            cols={32}
            rows={5}
          ></textarea>
        ) : (
          <input
            type="text"
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            className={inputBaseStyle}
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
