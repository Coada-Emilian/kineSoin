/**
 * @file DescriptionInput.tsx
 * @description A React functional component that renders a textarea for inputting
 * a description. It supports conditional rendering of the textarea's `id` and
 * placeholder based on the props `therapist` and `affliction`. When the `therapist`
 * prop is true, the component allows state management for the therapist's
 * description through the provided setter function.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.therapist] - Optional flag that indicates if the input
 * is intended for a therapist's description. If true, it allows state management
 * for the description.
 * @param {boolean} [props.affliction] - Optional flag that indicates if the input
 * is intended for an affliction's description.
 * @param {string} [props.therapistDescription] - The current value of the
 * therapist's description, used when `therapist` is true.
 * @param {React.Dispatch<React.SetStateAction<string>>} [props.setTherapistDescription]
 * - The function to update the state for the therapist's description.
 *
 * @returns {JSX.Element} The rendered DescriptionInput component, which includes
 * a label and a textarea for entering a description.
 */

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
