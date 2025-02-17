import { useState } from 'react';

interface StandardDateInputProps {
  isPatientRegisterBirthdateInput?: boolean;
  setRegisteredPatientBirthDate?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  isNewPrescriptionDateInput?: boolean;
  isPatientProfileBirthDateModification?: boolean;
  birth_date?: string;
}

export default function StandardDateInput({
  isPatientRegisterBirthdateInput,
  setRegisteredPatientBirthDate,
  isNewPrescriptionDateInput,
  isPatientProfileBirthDateModification,
  birth_date,
}: StandardDateInputProps) {
  const [patientBirthDate, setPatientBirthDate] = useState<string | undefined>(
    birth_date
  );

  const getHtmlFor = () =>
    isPatientRegisterBirthdateInput
      ? 'patient-register-birth_date_input'
      : isNewPrescriptionDateInput
        ? 'new-prescription-date_input'
        : isPatientProfileBirthDateModification
          ? 'patient-profile-birth_date_input'
          : '';

  const getDivClassName = () =>
    isNewPrescriptionDateInput
      ? 'mb-4 flex gap-2 items-center md:items-start'
      : isPatientProfileBirthDateModification
        ? 'mb-4 flex gap-2 items-center md:items-start w-full'
        : 'mb-4 flex gap-2 flex-col';

  const getLabelClassName = () =>
    isPatientProfileBirthDateModification
      ? 'text-xxs md:text-base xl:text-xl w-full md:w-1/2 flex text-primaryBlue font-medium italic'
      : 'text-sm text-primaryBlue font-medium italic';

  const getLabelContent = () =>
    isPatientRegisterBirthdateInput
      ? 'Date de naissance'
      : isNewPrescriptionDateInput
        ? "Date de l'ordonnance"
        : isPatientProfileBirthDateModification
          ? 'Date de naissance'
          : '';

  const getInputName = () =>
    isPatientRegisterBirthdateInput
      ? 'birth-date'
      : isPatientProfileBirthDateModification
        ? 'birth_date'
        : isNewPrescriptionDateInput
          ? 'date'
          : '';

  const getInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPatientRegisterBirthdateInput && setRegisteredPatientBirthDate) {
      setRegisteredPatientBirthDate(e.target.value);
    } else if (isPatientProfileBirthDateModification) {
      setPatientBirthDate(e.target.value);
    }
    return undefined;
  };

  const getInputValue = () => (birth_date ? patientBirthDate : undefined);

  const id = getHtmlFor();
  const divClassName = getDivClassName();
  const labelClassName = getLabelClassName();
  const labelContent = getLabelContent();
  const inputName = getInputName();
  const inputOnChange = getInputOnChange;
  const inputValue = getInputValue();

  return (
    <div className={divClassName}>
      <label htmlFor={id} className={labelClassName}>
        {labelContent}
      </label>

      <input
        type="date"
        name={inputName}
        id={id}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50"
        onChange={(e) => inputOnChange(e)}
        value={inputValue}
      />
    </div>
  );
}
