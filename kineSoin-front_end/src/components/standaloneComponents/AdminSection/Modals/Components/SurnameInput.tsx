// Desc: This component is used to input the surname of a therapist or a medic

interface SurnameInputProps {
  therapist?: boolean;
  medic?: boolean;
  therapistName?: string;
  setTherapistName?: React.Dispatch<React.SetStateAction<string>>;
}

export default function SurnameInput({
  therapist,
  medic,
  therapistName,
  setTherapistName,
}: SurnameInputProps) {
  return (
    <div>
      <label
        htmlFor={`${therapist ? 'therapist-surname_input' : medic ? 'medic-surname_input' : ''}`}
        className="block text-xs md:text-sm font-medium text-gray-700"
      >
        Prénom
      </label>

      <input
        type="text"
        id={`${therapist ? 'therapist-surname_input' : medic ? 'medic-surname_input' : ''}`}
        name="surname"
        className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
        {...(therapist
          ? {
              value: therapistName,
              onChange: (e) =>
                setTherapistName && setTherapistName(e.target.value),
            }
          : {})}
        required
      />
    </div>
  );
}
