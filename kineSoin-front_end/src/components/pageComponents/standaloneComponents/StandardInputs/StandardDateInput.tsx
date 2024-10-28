interface StandardDateInputProps {
  patientRegisterBirthDate?: Date;
  setPatientRegisterBirthDate?: React.Dispatch<React.SetStateAction<Date>>;
}

export default function StandardDateInput({
  patientRegisterBirthDate,
  setPatientRegisterBirthDate,
}: StandardDateInputProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor="patient-register-birth_date_input"
        className="text-gray-600 text-sm font-medium"
      >
        Date de naissance
      </label>

      <input
        type="date"
        name="birth-date"
        id="patient-register-birth_date_input"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={patientRegisterBirthDate?.toISOString().split('T')[0]}
        onChange={(e) => {
          setPatientRegisterBirthDate && setPatientRegisterBirthDate(new Date(e.target.value));
        }}
      />
    </div>
  );
}
