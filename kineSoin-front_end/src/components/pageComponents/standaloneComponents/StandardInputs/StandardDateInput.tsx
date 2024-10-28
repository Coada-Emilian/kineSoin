interface StandardDateInputProps {
  setRegisteredPatientBirthDate: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export default function StandardDateInput({
  setRegisteredPatientBirthDate,
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
        onChange={(e) => {
          setRegisteredPatientBirthDate &&
            setRegisteredPatientBirthDate(e.target.value);
        }}
      />
    </div>
  );
}
