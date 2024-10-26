/**
 * @file EmailInput.tsx
 * @description A React functional component that renders an input field for
 * entering a therapist's email address. It includes a label and an input
 * field that manages the email value through the provided state setter
 * function.
 *
 * @param {Object} props - The component props.
 * @param {string} props.therapistEmail - The current value of the therapist's
 * email, which is displayed in the input field.
 * @param {(email: string) => void} props.setTherapistEmail - The function to
 * update the state for the therapist's email.
 *
 * @returns {JSX.Element} The rendered EmailInput component, which includes
 * a label and an input field for entering the email address.
 */

interface EmailInputProps {
  therapistEmail: string;
  setTherapistEmail: (email: string) => void;
}

export default function EmailInput({
  therapistEmail,
  setTherapistEmail,
}: EmailInputProps) {
  return (
    <div>
      <label
        htmlFor="therapist-email_input"
        className="block text-xs md:text-sm font-medium text-gray-700"
      >
        E-mail
      </label>

      <input
        type="email"
        id="therapist-email_input"
        name="email"
        className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
        value={therapistEmail}
        onChange={(e) => setTherapistEmail(e.target.value)}
        required
      />
    </div>
  );
}
