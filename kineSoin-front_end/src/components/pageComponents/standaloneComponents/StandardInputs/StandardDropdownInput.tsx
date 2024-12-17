interface StandardChoiceDropdownProps {
  isGenderDropdownInput?: boolean;
  registeredPatientGender?: string;
  setRegisteredPatientGender?: React.Dispatch<React.SetStateAction<string>>;
}

export default function StandardChoiceDropdown({
  isGenderDropdownInput,
  registeredPatientGender,
  setRegisteredPatientGender,
}: StandardChoiceDropdownProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={
          isGenderDropdownInput ? 'patient-register-gender_dropdown' : undefined
        }
        className="text-primaryBlue text-sm font-medium block mb-2"
      >
        {isGenderDropdownInput && 'Genre'}
      </label>

      <select
        id={
          isGenderDropdownInput ? 'patient-register-gender_dropdown' : undefined
        }
        value={
          isGenderDropdownInput && registeredPatientGender
            ? registeredPatientGender
            : undefined
        }
        onChange={(e) => {
          isGenderDropdownInput &&
            setRegisteredPatientGender &&
            setRegisteredPatientGender(e.target.value);
        }}
        className="block w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">Sélectionnez votre genre</option>
        <option value="male">Homme</option>
        <option value="female">Femme</option>
        <option value="other">Autre</option>
      </select>
    </div>
  );
}
