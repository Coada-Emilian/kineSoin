// Purpose: The purpose of this component is to render the admin therapists page.

interface StreetNameInputProps {
  medic?: boolean;
  insurance?: boolean;
}

export default function StreetNameInput({
  medic,
  insurance,
}: StreetNameInputProps) {
  return (
    <div className="flex flex-col space-y-1 w-4/6">
      <label
        htmlFor={`${medic ? 'medic-street-name_input' : insurance ? 'insurance-street-name_input' : ''}`}
        className="block text-xs md:text-sm font-medium text-gray-700"
      >
        Nom de rue
      </label>

      <input
        type="text"
        name="street_name"
        id={`${medic ? 'medic-street-name_input' : insurance ? 'insurance-street-name_input' : ''}`}
        className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
        required
      />
    </div>
  );
}
