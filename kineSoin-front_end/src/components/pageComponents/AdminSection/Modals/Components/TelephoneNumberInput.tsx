/**
 * @file TelephoneNumberInput.tsx
 * @description A React component for inputting a telephone number.
 * This component can be used in contexts for either medical professionals
 * or insurance-related forms, with appropriate labeling and input IDs
 * based on the context.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.medic] - Optional flag indicating if the input
 * is for a medic context. If true, the input will be tailored for
 * medical professionals with specific IDs.
 * @param {boolean} [props.insurance] - Optional flag indicating if the
 * input is for an insurance context. If true, a different ID will be
 * assigned to the input field.
 *
 * @returns {JSX.Element} The rendered TelephoneNumberInput component,
 * which includes a label and a text input field for the telephone number.
 */

interface TelephoneNumberInputProps {
  medic?: boolean;
  insurance?: boolean;
}

export default function TelephoneNumberInput({
  medic,
  insurance,
}: TelephoneNumberInputProps) {
  return (
    <div>
      <label
        htmlFor={`${medic ? 'medic-telephone_input' : insurance ? 'insurance-telephone_input' : ''}`}
        className="block text-xs md:text-sm font-medium text-gray-700"
      >
        Numero telephone :
      </label>

      <input
        type="text"
        id={`${medic ? 'medic-telephone_input' : insurance ? 'insurance-telephone_input' : ''}`}
        name="phone_number"
        className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
        required
      />
    </div>
  );
}
