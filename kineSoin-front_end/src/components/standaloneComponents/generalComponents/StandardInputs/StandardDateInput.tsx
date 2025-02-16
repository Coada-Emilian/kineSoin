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
  return (
    <div
      className={`mb-4 flex gap-2 ${isNewPrescriptionDateInput ? 'items-center md:items-start ' : isPatientProfileBirthDateModification ? 'flex-row items-center w-full' : 'flex-col'}`}
    >
      <label
        htmlFor={
          isPatientRegisterBirthdateInput
            ? 'patient-register-birth_date_input'
            : isNewPrescriptionDateInput
              ? 'new-prescription-date_input'
              : isPatientProfileBirthDateModification
                ? 'patient-profile-birth_date_input'
                : isPatientProfileBirthDateModification
                  ? 'patient-profile-birth_date_input'
                  : ''
        }
        className={`${isPatientProfileBirthDateModification ? 'text-xxs md:text-base xl:text-xl w-full md:w-1/2 flex' : 'text-sm'} text-primaryBlue font-medium italic`}
      >
        {isPatientRegisterBirthdateInput
          ? 'Date de naissance'
          : isNewPrescriptionDateInput
            ? "Date de l'ordonnance"
            : isPatientProfileBirthDateModification
              ? 'Date de naissance'
              : ''}
      </label>

      <input
        type="date"
        name={
          isPatientRegisterBirthdateInput
            ? 'birth-date'
            : isPatientProfileBirthDateModification
              ? 'birth_date'
              : isNewPrescriptionDateInput
                ? 'date'
                : ''
        }
        id={
          isPatientRegisterBirthdateInput
            ? 'patient-register-birth_date_input'
            : isNewPrescriptionDateInput
              ? 'new-prescription-date_input'
              : isPatientProfileBirthDateModification
                ? 'patient-profile-birth_date_input'
                : ''
        }
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50"
        onChange={(e) => {
          isPatientRegisterBirthdateInput && setRegisteredPatientBirthDate
            ? setRegisteredPatientBirthDate(e.target.value)
            : isPatientProfileBirthDateModification
              ? setPatientBirthDate(e.target.value)
              : undefined;
        }}
        value={birth_date ? patientBirthDate : undefined}
      />
    </div>
  );
}
