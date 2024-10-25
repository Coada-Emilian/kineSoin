import { IInsurance } from '../../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../../@types/IMedic';

interface AddressProps {
  medic?: IMedic;
  insurance?: IInsurance;
}

export default function Address({ medic, insurance }: AddressProps) {
  return (
    <div className="md:text-2xl">
      <h4 className="font-bold ">Adresse :</h4>
      <span className="italic font-normal">
        {medic?.address || insurance?.address || ''}
      </span>
    </div>
  );
}
