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
