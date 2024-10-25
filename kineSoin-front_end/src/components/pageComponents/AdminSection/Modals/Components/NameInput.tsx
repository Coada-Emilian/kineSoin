interface NameInputProps {
  therapist?: boolean;
  affliction?: boolean;
  region?: boolean;
  medic?: boolean;
  insurance?: boolean;
  therapistName?: string;
  setTherapistName?: React.Dispatch<React.SetStateAction<string>>;
  afflictionName?: string;
  setAfflictionName?: React.Dispatch<React.SetStateAction<string>>;
}

export default function NameInput({
  therapist,
  affliction,
  region,
  medic,
  insurance,
  therapistName,
  setTherapistName,
}: NameInputProps) {
  return (
    <div>
      <label
        htmlFor={`${therapist ? 'therapist-name_input' : affliction ? 'affliction-name_input' : region ? 'region-name_input' : medic ? 'medic-name_input' : insurance ? 'insurance-name_input' : ''}`}
        className="block text-xs md:text-sm font-medium text-gray-700"
      >
        Nom
      </label>

      <input
        type="text"
        id={`${therapist ? 'therapist-name_input' : affliction ? 'affliction-name_input' : region ? 'region-name_input' : medic ? 'medic-name_input' : insurance ? 'insurance-name_input' : ''}`}
        name="name"
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
