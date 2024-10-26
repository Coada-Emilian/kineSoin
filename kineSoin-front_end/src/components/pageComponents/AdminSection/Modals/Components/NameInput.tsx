/**
 * @file NameInput.tsx
 * @description A React functional component that renders an input field for
 * entering a name. The component conditionally displays different labels and
 * input names based on the provided props to indicate whether the input is
 * for a therapist, affliction, region, medic, or insurance.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.therapist] - Indicates if the input is for a therapist.
 * @param {boolean} [props.affliction] - Indicates if the input is for an affliction.
 * @param {boolean} [props.region] - Indicates if the input is for a region.
 * @param {boolean} [props.medic] - Indicates if the input is for a medic.
 * @param {boolean} [props.insurance] - Indicates if the input is for insurance.
 * @param {string} [props.therapistName] - The current value of the therapist's name.
 * @param {function} [props.setTherapistName] - A callback function to update the therapist's name.
 * @param {string} [props.afflictionName] - The current value of the affliction's name (not used).
 * @param {function} [props.setAfflictionName] - A callback function to update the affliction's name (not used).
 *
 * @returns {JSX.Element} The rendered NameInput component, which includes a label and
 * an input field for entering a name based on the specified context.
 */

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
