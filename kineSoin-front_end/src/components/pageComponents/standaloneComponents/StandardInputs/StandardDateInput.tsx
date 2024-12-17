interface StandardDateInputProps {
  isPatientRegisterBirthdateInput?: boolean;
  setRegisteredPatientBirthDate?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export default function StandardDateInput({
  isPatientRegisterBirthdateInput,
  setRegisteredPatientBirthDate,
}: StandardDateInputProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={
          isPatientRegisterBirthdateInput
            ? 'patient-register-birth_date_input'
            : ''
        }
        className="text-primaryBlue text-sm font-medium"
      >
        Date de naissance
      </label>

      <input
        type="date"
        name={isPatientRegisterBirthdateInput ? 'birth-date' : ''}
        id={
          isPatientRegisterBirthdateInput
            ? 'patient-register-birth_date_input'
            : ''
        }
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50"
        onChange={(e) => {
          isPatientRegisterBirthdateInput &&
            setRegisteredPatientBirthDate &&
            setRegisteredPatientBirthDate(e.target.value);
        }}
      />
    </div>
  );
}
