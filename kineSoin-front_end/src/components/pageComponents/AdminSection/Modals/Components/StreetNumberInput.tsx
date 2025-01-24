// Purpose: Provide a component for the street number input field.

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
