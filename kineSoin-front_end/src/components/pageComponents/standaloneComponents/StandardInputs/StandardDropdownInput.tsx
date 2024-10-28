interface StandardChoiceDropdownProps {
  registeredPatientGender: string;
  setRegisteredPatientGender: React.Dispatch<React.SetStateAction<string>>;
}

export default function StandardChoiceDropdown({
  registeredPatientGender,
  setRegisteredPatientGender,
}: StandardChoiceDropdownProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor="patient-register-gender_dropdown"
        className="text-gray-600 text-sm font-medium block mb-2"
      >
        Genre
      </label>
      <select
        id="patient-register-gender_dropdown"
        value={registeredPatientGender}
        onChange={(e) => setRegisteredPatientGender(e.target.value)}
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
