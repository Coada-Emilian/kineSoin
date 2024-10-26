/**
 * @file StatusInput.tsx
 * @description A React component for selecting a therapist's status.
 * This component includes a labeled dropdown menu that allows the user
 * to choose the therapist's current status (active or inactive).
 *
 * @param {Object} props - The component props.
 * @param {string} props.therapistStatus - The current status value of the therapist.
 * @param {function} props.setTherapistStatus - A function to update the therapist's status
 * state in the parent component.
 *
 * @returns {JSX.Element} The rendered StatusInput component, which includes
 * a dropdown for selecting the therapist's status.
 */

interface StatusInputProps {
  therapistStatus: string;
  setTherapistStatus: (status: string) => void;
}

export default function StatusInput({
  therapistStatus,
  setTherapistStatus,
}: StatusInputProps) {
  return (
    <div>
      <label
        htmlFor="therapistStatus"
        className="block text-xs md:text-sm font-medium text-gray-700"
      >
        Statut
      </label>

      <select
        id="therapistStatus"
        className="mt-1 text-xs md:text-sm block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={therapistStatus}
        onChange={(e) => setTherapistStatus(e.target.value as string)}
      >
        {' '}
        <option value="">Choisir un statut</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}
