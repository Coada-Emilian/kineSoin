import { IAffliction } from '../../../../../../../@types/IAffliction';

interface AfflictionBodyRegionProps {
  affliction: IAffliction;
}

export default function AfflictionBodyRegion({
  affliction,
}: AfflictionBodyRegionProps) {
  return (
    <section className="mb-2 md:text-2xl">
      <div className="md:text-2xl md:flex md:gap-1">
        <h4 className="font-bold ">Region concernée :</h4>
        <span className="italic font-normal">
          {affliction.body_region?.name}
        </span>
      </div>
    </section>
  );
}
