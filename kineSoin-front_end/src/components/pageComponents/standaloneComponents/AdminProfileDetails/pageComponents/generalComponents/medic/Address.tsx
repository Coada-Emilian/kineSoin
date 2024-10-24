import { IMedic } from '../../../../../../../@types/IMedic';

interface AddressProps {
  medic: IMedic;
}

export default function Address({ medic }: AddressProps) {
  return (
    <div className="md:text-2xl">
      <h4 className="font-bold ">Adresse :</h4>
      <span className="italic font-normal">{medic.address}</span>
    </div>
  );
}
