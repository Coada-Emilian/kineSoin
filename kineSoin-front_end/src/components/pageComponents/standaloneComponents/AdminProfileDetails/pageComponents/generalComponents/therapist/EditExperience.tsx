import { ITherapist } from '../../../../../../../@types/ITherapist';

interface EditExperienceProps {
  therapist: ITherapist;
}

export default function EditExperience({ therapist }: EditExperienceProps) {
  return (
    <div className="flex gap-2 items-center mb-2">
      <label htmlFor="experience" className="font-semibold">
        Expérience :
      </label>
      <input
        type="text"
        name="experience"
        id="therapist_experience"
        className="border-2 border-gray-300 rounded-md px-2"
        placeholder={therapist.experience}
      />
    </div>
  );
}
