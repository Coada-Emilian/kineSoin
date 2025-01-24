// Purpose: The purpose of this component is to render the input field for the therapist's diploma.

interface DiplomaInputProps {
  therapistDiploma: string;
  setTherapistDiploma: React.Dispatch<React.SetStateAction<string>>;
}

export default function DiplomaInput({
  therapistDiploma,
  setTherapistDiploma,
}: DiplomaInputProps) {
  return (
    <div>
      <label
        htmlFor="therapist-diploma_input"
        className="block text-xs md:text-sm font-medium text-gray-700"
      >
        Diplôme
      </label>

      <input
        type="text"
        id="therapist-diploma_input"
        name="diploma"
        className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
        value={therapistDiploma}
        onChange={(e) => setTherapistDiploma(e.target.value)}
        required
      />
    </div>
  );
}
