// Purpose: The purpose of this component is to render the city input field.

interface CityInputProps {
  medic?: boolean;
  insurance?: boolean;
}

export default function CityInput({ medic, insurance }: CityInputProps) {
  return (
    <div className="flex flex-col space-y-1 w-4/6">
      <label
        htmlFor={`${medic ? 'medic-city_input' : insurance ? 'insurance-city_input' : ''}`}
        className="block text-xs md:text-sm font-medium text-gray-700"
      >
        Ville
      </label>

      <input
        type="text"
        name="city"
        id={`${medic ? 'medic-city_input' : insurance ? 'insurance-city_input' : ''}`}
        className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
        required
      />
    </div>
  );
}
