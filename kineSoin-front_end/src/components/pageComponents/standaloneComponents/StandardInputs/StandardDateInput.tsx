interface StandardDateInputProps {
  isPatientRegisterBirthdateInput?: boolean;
  setRegisteredPatientBirthDate?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  isNewPrescriptionDateInput?: boolean;
  setNewPrescriptionDate?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export default function StandardDateInput({
  isPatientRegisterBirthdateInput,
  setRegisteredPatientBirthDate,
  isNewPrescriptionDateInput,
  setNewPrescriptionDate,
}: StandardDateInputProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={
          isPatientRegisterBirthdateInput
            ? 'patient-register-birth_date_input'
            : isNewPrescriptionDateInput
              ? 'new-prescription-date_input'
              : ''
        }
        className="text-primaryBlue text-sm font-medium"
      >
        {isPatientRegisterBirthdateInput
          ? 'Date de naissance'
          : isNewPrescriptionDateInput
            ? "Date de l'ordonnance :"
            : ''}
      </label>

      <input
        type="date"
        name={
          isPatientRegisterBirthdateInput
            ? 'birth-date'
            : isNewPrescriptionDateInput
              ? 'date'
              : ''
        }
        id={
          isPatientRegisterBirthdateInput
            ? 'patient-register-birth_date_input'
            : isNewPrescriptionDateInput
              ? 'new-prescription-date_input'
              : ''
        }
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50"
        onChange={(e) => {
          isPatientRegisterBirthdateInput &&
            setRegisteredPatientBirthDate &&
            setRegisteredPatientBirthDate(e.target.value);

          isNewPrescriptionDateInput &&
            setNewPrescriptionDate &&
            setNewPrescriptionDate(e.target.value);
        }}
      />
    </div>
  );
}
