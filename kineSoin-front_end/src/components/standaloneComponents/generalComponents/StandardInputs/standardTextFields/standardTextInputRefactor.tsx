import { useState } from 'react';
import { ITextInput } from '../../../../../@types/inputInterfaces';

interface StandardTextInputProps {
  textInput: ITextInput;
}

export default function StandardTextInputRefactor({
  textInput,
}: StandardTextInputProps) {
  const [value, setValue] = useState(textInput.inputValue || '');
  return (
    <>
      <div
        className={`${textInput.additionalDivClassName ? textInput.additionalDivClassName : 'w-full'} flex flex-col mb-4 gap-2 italic`}
      >
        <label
          htmlFor={textInput.inputId}
          className={`${textInput.additionalLabelClassName && textInput.additionalLabelClassName} text-primaryBlue font-medium`}
        >
          {textInput.labelName}
        </label>
        {textInput.isTextArea ? (
          <textarea
            name={textInput.inputName}
            id={`${textInput.inputId}-textarea`}
            placeholder={textInput.inputPlaceholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1 block text-xs md:text-md xl:text-xl 2xl:text-2xl w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal sm:text-xs lg:text-base font-normal placeholder:text-xs md:placeholder:text-md xl:placeholder:text-lg "
            cols={32}
            rows={5}
          ></textarea>
        ) : (
          <input
            type="text"
            id={textInput.inputId}
            name={textInput.inputName}
            placeholder={textInput.inputPlaceholder}
            className="text-xxs md:text-xs xl:text-sm 2xl:text-md w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal"
            required={textInput.isRequired}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete={textInput.autoComplete}
          />
        )}
      </div>
    </>
  );
}
