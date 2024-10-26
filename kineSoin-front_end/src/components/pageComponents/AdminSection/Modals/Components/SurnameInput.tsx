/**
 * @file SurnameInput.tsx
 * @description A React component for inputting a surname or first name.
 * This component can be used in contexts for either therapists or
 * medical professionals, with appropriate labeling and input IDs based
 * on the context.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.therapist] - Optional flag indicating if the input
 * is for a therapist context. If true, the input will be tailored for
 * therapists with specific IDs and state management.
 * @param {boolean} [props.medic] - Optional flag indicating if the input
 * is for a medic context. If true, a different ID will be assigned to
 * the input field.
 * @param {string} [props.therapistName] - Optional value representing
 * the name of the therapist. This will be displayed in the input field
 * if the therapist prop is true.
 * @param {function} [props.setTherapistName] - Optional setter function
 * to update the therapist's name in state. This function is called
 * whenever the input value changes.
 *
 * @returns {JSX.Element} The rendered SurnameInput component, which
 * includes a label and a text input field for the surname.
 */

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
