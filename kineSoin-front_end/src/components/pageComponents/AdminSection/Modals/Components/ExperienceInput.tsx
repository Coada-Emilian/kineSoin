interface ExperienceInputProps {
  therapistExperience: string;
  setTherapistExperience: React.Dispatch<React.SetStateAction<string>>;
}

export default function ExperienceInput({
  therapistExperience,
  setTherapistExperience,
}: ExperienceInputProps) {
  return (
    <div>
      <label
        htmlFor="therapist-experience_input"
        className="block text-xs md:text-sm font-medium text-gray-700"
      >
        Experience
      </label>

      <input
        type="text"
        id="therapist-experience_input"
        name="experience"
        className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
        value={therapistExperience}
        onChange={(e) => setTherapistExperience(e.target.value)}
        required
      />
    </div>
  );
}
