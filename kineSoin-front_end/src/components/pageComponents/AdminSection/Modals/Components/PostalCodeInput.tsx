/**
 * @file PostalCodeInput.tsx
 * @description A React component for inputting postal codes. It conditionally
 * renders the input field based on the type of user (medic or insurance).
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.medic] - Indicates if the input is for a medic.
 * @param {boolean} [props.insurance] - Indicates if the input is for insurance.
 *
 * @returns {JSX.Element} The rendered PostalCodeInput component, which includes
 * a label and an input field for postal code entry.
 */

interface PostalCodeInputProps {
  medic?: boolean;
  insurance?: boolean;
}

export default function PostalCodeInput({
  medic,
  insurance,
}: PostalCodeInputProps) {
  return (
    <div className="flex flex-col space-y-1 w-2/6">
      <label
        htmlFor={`${medic ? 'medic-postal-code_input' : insurance ? 'insurance-postal-code_input' : ''}`}
        className="block text-xs md:text-sm font-medium text-gray-700"
      >
        Code postal
      </label>
      <input
        type="text"
        name="postal_code"
        id={`${medic ? 'medic-postal-code_input' : insurance ? 'insurance-postal-code_input' : ''}`}
        className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
        required
      />
    </div>
  );
}
