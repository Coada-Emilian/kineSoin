import { ITherapist } from '../../../../../../@types/ITherapist';

interface EditSpecialtyProps {
  therapist: ITherapist;
}

export default function EditSpecialty({ therapist }: EditSpecialtyProps) {
  return (
    <div className="flex gap-2 items-center mb-2">
      <label htmlFor="specialty" className="font-semibold">
        Spécialité :
      </label>
      <input
        type="text"
        name="specialty"
        id="therapist_specialty"
        className="border-2 border-gray-300 rounded-md px-2"
        placeholder={therapist.specialty}
      />
    </div>
  );
}
