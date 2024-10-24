import { IMedic } from '../../../../../../../@types/IMedic';

interface LicenceCodeProps {
  medic: IMedic;
}

export default function LicenceCode({ medic }: LicenceCodeProps) {
  return (
    <div className="md:text-2xl">
      <h4 className="font-bold ">Code ADELI :</h4>
      <span className="italic font-normal">{medic.licence_code}</span>
    </div>
  );
}
