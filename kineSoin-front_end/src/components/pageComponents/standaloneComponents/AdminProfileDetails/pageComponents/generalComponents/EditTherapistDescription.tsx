import { ITherapist } from '../../../../../../@types/ITherapist';

interface EditTherapistDescriptionProps {
  therapist: ITherapist;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export default function EditTherapistDescription({
  therapist,
  description,
  setDescription,
}: EditTherapistDescriptionProps) {
  return (
    <div className="flex flex-col gap-2 justify-start mb-2">
      <label htmlFor="description" className="font-semibold">
        Description :
      </label>
      <textarea
        name="description"
        id="therapist_description"
        className="border-2 border-gray-300 rounded-md px-2 font-normal italic "
        rows={7}
        placeholder={therapist.description}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
    </div>
  );
}
