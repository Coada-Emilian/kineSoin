import { IAffliction } from '../../../../../../../@types/IAffliction';

interface AfflictionInsuranceCodeProps {
  affliction: IAffliction;
}

export default function AfflictionInsuranceCode({
  affliction,
}: AfflictionInsuranceCodeProps) {
  return (
    <section className="mb-2 md:text-2xl">
      <div className="md:text-2xl md:flex md:gap-1">
        <h4 className="font-bold ">Cotation :</h4>
        <span className="italic font-normal">{affliction.insurance_code}</span>
      </div>
    </section>
  );
}
