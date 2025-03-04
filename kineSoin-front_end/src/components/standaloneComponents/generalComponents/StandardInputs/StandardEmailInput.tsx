import { useState } from 'react';
import { IEmailInput } from '../../../../@types/inputInterfaces';

interface StandardEmailInputProps {
  emailInput: IEmailInput;
}

export default function StandardEmailInput({
  emailInput,
}: StandardEmailInputProps) {
  const [patientEmail, setPatientEmail] = useState(
    emailInput.old_email ? emailInput.old_email : ''
  );

  return (
    <div
      className={`${emailInput.additionalDivClassName ? emailInput.additionalDivClassName : 'flex-col'} flex gap-1 w-full text-xs md:text-sm xl:text-md 2xl:text-lg italic mb-2`}
    >
      <label
        htmlFor={emailInput.inputId}
        className={`${emailInput.additionalLabelClassName ? emailInput.additionalLabelClassName : ''} text-primaryBlue font-medium italic `}
      >
        E-mail
      </label>

      <input
        type="email"
        name="email"
        id={emailInput.inputId}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50 text-xxs md:text-xs xl:text-sm 2xl:text-md w-full"
        placeholder={
          emailInput.inputPlaceholder
            ? emailInput.inputPlaceholder
            : 'Entrez votre e-mail'
        }
        value={patientEmail}
        onChange={(e) => setPatientEmail(e.target.value)}
        required
        autoComplete="email"
      />
    </div>
  );
}
