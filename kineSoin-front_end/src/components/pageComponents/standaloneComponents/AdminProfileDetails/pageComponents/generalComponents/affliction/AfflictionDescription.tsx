import { IAffliction } from '../../../../../../../@types/IAffliction';

interface AfflictionDescriptionProps {
  affliction: IAffliction;
}

export default function AfflictionDescription({
  affliction,
}: AfflictionDescriptionProps) {
  return (
    <div className="md:text-2xl flex flex-col">
      <label htmlFor="affliction_description_container" className="font-bold">
        Description :
      </label>
      <textarea
        readOnly
        id="affliction_description_container"
        className="border-2 border-gray-300 rounded-md px-2 font-normal italic "
        rows={7}
        value={affliction.description}
      ></textarea>
    </div>
  );
}
