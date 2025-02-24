import { IEmailInput } from '../../../../@types/customTypes';

interface StandardEmailInputProps {
  emailInput: IEmailInput;
}

export default function StandardEmailInput2({
  emailInput,
}: StandardEmailInputProps) {
  return (
    <div
      className={`${emailInput.additionalDivClassName ? emailInput.additionalDivClassName : ''} flex flex-col gap-1 w-full text-xxs md:text-xs xl:text-sm 2xl:text-md italic `}
    >
      <label
        htmlFor={emailInput.inputId}
        className={`${emailInput.additionalLabelClassName ? 'w-1/6 md:w-1/12' : ''} text-primaryBlue font-medium italic `}
      >
        E-mail
      </label>

      <input
        type="email"
        name="email"
        id={emailInput.inputId}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50 text-xxs md:text-xs xl:text-sm 2xl:text-md"
        placeholder={emailInput.inputPlaceholder}
        required
        autoComplete="email"
      />
    </div>
  );
}
