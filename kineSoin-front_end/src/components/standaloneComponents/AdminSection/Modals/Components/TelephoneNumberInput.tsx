// Purpose: The purpose of this component is to render the telephone number input.

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
        Numéro téléphone :
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
