/**
 * @file CityInput.tsx
 * @description A React functional component that renders an input field for a city name.
 * It supports conditional rendering of the input's `id` based on the props `medic`
 * and `insurance`, which may alter the context in which the input is used (e.g.,
 * for a medical form or an insurance form).
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.medic] - Optional flag that indicates if the input is
 * intended for a medical context. If true, the input's `id` will be prefixed with
 * 'medic-' for identification.
 * @param {boolean} [props.insurance] - Optional flag that indicates if the input is
 * intended for an insurance context. If true, the input's `id` will be prefixed with
 * 'insurance-' for identification.
 *
 * @returns {JSX.Element} The rendered CityInput component, which includes a label
 * and an input field for entering a city name.
 */

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
