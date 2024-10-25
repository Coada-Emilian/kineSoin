import { IInsurance } from '../../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../../@types/IMedic';

interface PhoneNumberProps {
  medic?: IMedic;
  insurance?: IInsurance;
}

export default function PhoneNumber({ medic, insurance }: PhoneNumberProps) {
  return (
    <div className="md:text-2xl">
      <h4 className="font-bold ">Numero telephone :</h4>
      <span className="italic font-normal">
        {medic?.phone_number || insurance?.phone_number || ''}
      </span>
    </div>
  );
}
