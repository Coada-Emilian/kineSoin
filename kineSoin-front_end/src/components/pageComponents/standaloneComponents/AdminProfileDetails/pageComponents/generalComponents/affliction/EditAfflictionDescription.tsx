import { IAffliction } from '../../../../../../../@types/IAffliction';

interface EditAfflictionDescriptionProps {
  affliction: IAffliction;
  afflictionDescription: string;
  setAfflictionDescription: React.Dispatch<React.SetStateAction<string>>;
}

export default function EditAfflictionDescription({
  affliction,
  afflictionDescription,
  setAfflictionDescription,
}: EditAfflictionDescriptionProps) {
  return (
    <div className="flex flex-col gap-2 justify-start mb-2">
      <label htmlFor="affliction_description" className="font-semibold">
        Description :
      </label>
      <textarea
        name="description"
        id="affliction_description"
        className="border-2 border-gray-300 rounded-md px-2 font-normal italic "
        rows={7}
        placeholder={affliction.description}
        value={afflictionDescription}
        onChange={(e) => setAfflictionDescription(e.target.value)}
      ></textarea>
    </div>
  );
}
