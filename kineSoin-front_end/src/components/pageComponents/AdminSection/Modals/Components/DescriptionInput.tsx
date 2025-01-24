// Purpose: Provide a text area for the user to input a description of the therapist or affliction.

interface DescriptionInputProps {
  therapist?: boolean;
  affliction?: boolean;
  therapistDescription?: string;
  setTherapistDescription?: React.Dispatch<React.SetStateAction<string>>;
}

export default function DescriptionInput({
  therapist,
  affliction,
  therapistDescription,
  setTherapistDescription,
}: DescriptionInputProps) {
  return (
    <div>
      <label
        htmlFor={`${therapist ? 'therapist-description_input' : affliction ? 'affliction-description_input' : ''}`}
        className="block text-xs md:text-sm font-medium text-gray-700"
      >
        Description
      </label>

      <textarea
        name="description"
        id={`${therapist ? 'therapist-description_input' : affliction ? 'affliction-description_input' : ''}`}
        placeholder={`${therapist ? 'Description du kinésithérapeute' : affliction ? "Description de l'affliction" : ''}`}
        className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
        {...(therapist
          ? {
              value: therapistDescription,
              onChange: (e) =>
                setTherapistDescription &&
                setTherapistDescription(e.target.value),
            }
          : {})}
        required
        rows={5}
        cols={32}
      ></textarea>
    </div>
  );
}
