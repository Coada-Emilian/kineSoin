/**
 * @file StreetNumberInput.tsx
 * @description A React component for inputting a street number.
 * This component is designed to be used in forms related to
 * medical or insurance contexts, as indicated by the optional
 * props that modify its ID and labeling.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.medic] - Optional flag indicating if the input
 * is for a medical context. If true, a specific ID will be assigned to
 * the input field.
 * @param {boolean} [props.insurance] - Optional flag indicating if the input
 * is for an insurance context. If true, a different ID will be assigned to
 * the input field.
 *
 * @returns {JSX.Element} The rendered StreetNumberInput component, which
 * includes a label and a text input field for the street number.
 */

interface StreetNumberInputProps {
  medic?: boolean;
  insurance?: boolean;
}

export default function StreetNumberInput({
  medic,
  insurance,
}: StreetNumberInputProps) {
  return (
    <div className="flex flex-col space-y-1 w-2/6">
      <label
        htmlFor={`${medic ? 'medic-street-number_input' : insurance ? 'insurance-street-number_input' : ''}`}
        className="block text-xs md:text-sm font-medium text-gray-700"
      >
        Numéro de rue
      </label>
      <input
        type="text"
        name="street_number"
        id={`${medic ? 'medic-street-number_input' : insurance ? 'insurance-street-number_input' : ''}`}
        className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs "
        required
      />
    </div>
  );
}
