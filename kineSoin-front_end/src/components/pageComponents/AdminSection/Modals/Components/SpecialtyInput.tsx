interface SpecialtyInputProps {
  therapistSpecialty: string;
  setTherapistSpecialty: React.Dispatch<React.SetStateAction<string>>;
}

export default function SpecialtyInput({
  therapistSpecialty,
  setTherapistSpecialty,
}: SpecialtyInputProps) {
  return (
    <div>
      <label
        htmlFor="therapist-specialty_input"
        className="block text-xs md:text-sm font-medium text-gray-700"
      >
        Spécialité
      </label>

      <input
        type="text"
        id="therapist-specialty_input"
        name="specialty"
        className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
        value={therapistSpecialty}
        onChange={(e) => setTherapistSpecialty(e.target.value)}
        required
      />
    </div>
  );
}
