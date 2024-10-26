/**
 * @file LicenceCodeInput.tsx
 * @description A React functional component that renders an input field for
 * entering a license code. The component conditionally displays different labels
 * and input names based on the provided props to indicate whether the input is
 * for a therapist, affliction, medic, or insurance.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.therapist] - Indicates if the input is for a therapist.
 * @param {boolean} [props.affliction] - Indicates if the input is for an affliction.
 * @param {boolean} [props.medic] - Indicates if the input is for a medic.
 * @param {boolean} [props.insurance] - Indicates if the input is for insurance.
 * @param {string} [props.therapistLicenceCode] - The current value of the therapist's license code.
 * @param {function} [props.setTherapistLicenceCode] - A callback function to update the therapist's license code.
 *
 * @returns {JSX.Element} The rendered LicenceCodeInput component, which includes
 * a label and an input field for entering a license code based on the specified context.
 */

interface LicenceCodeInputProps {
  therapist?: boolean;
  affliction?: boolean;
  medic?: boolean;
  insurance?: boolean;
  therapistLicenceCode?: string;
  setTherapistLicenceCode?: React.Dispatch<React.SetStateAction<string>>;
}

export default function LicenceCodeInput({
  therapist,
  affliction,
  medic,
  insurance,
  therapistLicenceCode,
  setTherapistLicenceCode,
}: LicenceCodeInputProps) {
  return (
    <div>
      <label
        htmlFor={`${therapist ? 'therapist-licence-code_input' : affliction ? 'affliction-insurance-code_input' : medic ? 'medic-licence-code_input' : insurance ? 'insurance-amc-code_input' : ''}`}
        className="block text-xs md:text-sm font-medium text-gray-700"
      >
        {therapist || medic
          ? 'Code ADELI'
          : affliction
            ? 'Cotation :'
            : insurance
              ? 'Code AMC :'
              : ''}
      </label>

      <input
        type="text"
        id={`${therapist ? 'therapist-licence-code_input' : affliction ? 'affliction-insurance-code_input' : medic ? 'medic-licence-code_input' : insurance ? 'insurance-amc-code_input' : ''}`}
        name={`${therapist || medic ? 'licence_code' : affliction ? 'insurance_code' : insurance ? 'amc_code' : ''}`}
        className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
        {...(therapist
          ? {
              value: therapistLicenceCode,
              onChange: (e) =>
                setTherapistLicenceCode &&
                setTherapistLicenceCode(e.target.value),
            }
          : {})}
        required
      />
    </div>
  );
}
