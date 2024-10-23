import { IAffliction } from '../../../../../../../@types/IAffliction';

interface AfflictionOperatedStatusProps {
  affliction: IAffliction;
}

export default function AfflictionOperatedStatus({
  affliction,
}: AfflictionOperatedStatusProps) {
  return (
    <section className="mb-2 md:text-2xl">
      <div className="md:text-2xl md:flex md:gap-1">
        <h4 className="font-bold ">Est opérée :</h4>
        <span className="italic font-normal">
          {affliction.is_operated ? 'Oui' : 'Non'}
        </span>
      </div>
    </section>
  );
}
