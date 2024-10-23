import { IAffliction } from '../../../../../../../@types/IAffliction';

interface AfflictionInsuranceCodeProps {
  affliction: IAffliction;
  isProfileEditing: boolean;
}

export default function AfflictionInsuranceCode({
  affliction,
  isProfileEditing,
}: AfflictionInsuranceCodeProps) {
  return (
    <section className="mb-2 md:text-2xl">
      {isProfileEditing ? (
        <div className="flex gap-2 items-center mb-2 ">
          <label htmlFor="affliction-insurance_code" className="font-semibold">
            Cotation :
          </label>
          <input
            type="text"
            name="insurance_code"
            id="affliction-insurance_code"
            className="border-2 border-gray-300 rounded-md px-2 italic"
            placeholder={affliction.insurance_code || ''}
          />
        </div>
      ) : (
        <div className="md:text-2xl md:flex md:gap-1">
          <h4 className="font-bold ">Cotation :</h4>
          <span className="italic font-normal">
            {affliction.insurance_code}
          </span>
        </div>
      )}
    </section>
  );
}
