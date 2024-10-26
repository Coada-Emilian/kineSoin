/**
 * @file DiplomaInput.tsx
 * @description A React functional component that renders an input field for
 * entering a therapist's diploma information. It includes a label and an
 * input field that manages the diploma value through the provided state
 * setter function.
 *
 * @param {Object} props - The component props.
 * @param {string} props.therapistDiploma - The current value of the therapist's
 * diploma, which is displayed in the input field.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setTherapistDiploma
 * - The function to update the state for the therapist's diploma.
 *
 * @returns {JSX.Element} The rendered DiplomaInput component, which includes
 * a label and an input field for entering the diploma information.
 */

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
