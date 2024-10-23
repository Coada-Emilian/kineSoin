import { IAffliction } from '../../../../../../../@types/IAffliction';

interface AfflictionDescriptionProps {
  affliction: IAffliction;
}

export default function AfflictionDescription({
  affliction,
}: AfflictionDescriptionProps) {
  return (
    <div className="md:text-2xl">
      <h4 className="font-bold ">Description :</h4>
      <span className="italic font-normal">{affliction.description}</span>
    </div>
  );
}
